import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Navbar';
import Layout from '../../Component/Layout';
import axios from 'axios';

const LihatNilai = () => {
    const [foundId, setFoundId] = useState('');
    const [npmMahasiswa, setNpmMahasiswa] = useState('');
    const [dataNilai, setDataNilai] = useState([]);
    const [cariMahasiswa, setCariMahasiswa] = useState([])
    const [nilaiMahasiswa, setNilaiMahasiswa] = useState('');
    const [namaMahasiswa, setNamaMahasiswa] = useState(''); // Tambahkan state untuk nama mahasiswa

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/nilais');
                const mahasiswa = await axios.get('http://localhost:8080/mahasiswas')
                const dataMahasiswa = mahasiswa.data.data.data
                const dataNilai = response.data.data.data;
                setCariMahasiswa(dataMahasiswa)
                const foundElement = dataNilai.find((nilai) => nilai.NPM_ms === npmMahasiswa);
                if (foundElement) {
                    setFoundId(foundElement.id);
                    const foundNama = cariMahasiswa.find((nilai)=>nilai.NPM === npmMahasiswa)
                    console.log(foundNama)
                    
                    const nilaiResponse = await axios.get(`http://localhost:8080/nilai/${foundId}`);
                    const nilaiMahasiswa = nilaiResponse.data.data.data.Nilai_akhir;
                    setNilaiMahasiswa(nilaiMahasiswa);

                    
                    // Set nama mahasiswa jika data ditemukan
                    setNamaMahasiswa(foundNama.Nama_mhs);
                } else {
                    setFoundId('');
                    setNilaiMahasiswa('');
                    setNamaMahasiswa(''); // Reset nama mahasiswa jika data tidak ditemukan
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [npmMahasiswa, foundId]);
    
    const handleChange = (e) => {
        const { value } = e.target;
        setNpmMahasiswa(value);
    };

    return (
        <div>
            <Navbar />
            <Layout>
                <div className='flex justify-center gap-6'>
                    <input
                        className='w-full xl:w-[400px] px-4 py-5 outline-none border-b-2'
                        type="number"
                        id='npmMahasiswa'
                        name='npmMahasiswa'
                        value={npmMahasiswa}
                        placeholder='Cari NPM'
                        onChange={handleChange}
                    />
                </div>
                {foundId !== '' && (
                    <div>
                        <p>
                            Nilai Akhir Mahasiswa {namaMahasiswa}  (NPM {npmMahasiswa}):
                        </p>
                        <p>{nilaiMahasiswa}</p>
                    </div>
                )}
                {foundId === '' && npmMahasiswa !== '' && (
                    <p>Data dengan NPM {npmMahasiswa} tidak ditemukan.</p>
                )}
            </Layout>
        </div>
    );
};

export default LihatNilai;
