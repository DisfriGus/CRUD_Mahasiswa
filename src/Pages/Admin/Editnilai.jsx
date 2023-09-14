import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Editnilai = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const [data, setData] = useState({});
    const [dataNilai, setDataNilai] = useState([])
    const [idNilai, setIdNilai] = useState('')
    const [editedData, setEditedData] = useState({
        Nama_mhs: '',
        npm: '',
        Jurusan: '',
        email: '',
        presensi: '',
        nilaiAkhir: '',
        grade: '',
    });
    
    useEffect(() => {
        // Mengambil data dari API berdasarkan ID mahasiswa
        axios.get(`http://localhost:8080/mahasiswa/${id}`)
            .then((response) => {
                const mahasiswaData = response.data.data.data; // Access the data from the response
                setData(mahasiswaData); // Menyimpan data mahasiswa yang akan diedit
    
                // Mengambil data nilai berdasarkan NPM mahasiswa
                axios.get(`http://localhost:8080/nilais`)
                    .then((nilaiResponse) => {
                        const dNilai = nilaiResponse.data.data.data;
                        setDataNilai(dNilai);
                        console.log(dNilai)
                        const test = dNilai.find((n)=>n.NPM_ms === mahasiswaData.NPM)
                        setIdNilai(test.id)
                        // Set editedData dengan data yang akan diedit
                        setEditedData({
                            Nama_mhs: mahasiswaData.Nama_mhs,
                            npm: mahasiswaData.NPM,
                            Jurusan: mahasiswaData.Jurusan,
                            email: mahasiswaData.Email,
                            presensi: test.Presensi, // Corrected
                            nilaiAkhir: test.Nilai_akhir, // Corrected
                            grade: test.Grade, // Corrected
                        });
                        console.log(idNilai)
                    })
                    .catch((error) => {
                        console.error('Error fetching nilai data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching mahasiswa data:', error);
            });
    }, [id]);
    

    // Fungsi untuk menyimpan perubahan data
    const saveChanges = () => {
        // Mengirim data yang diubah ke API
        axios.put(`http://localhost:8080/mahasiswa/${id}`, editedData)
        axios.put(`http://localhost:8080/nilai/${idNilai}`, {
            NPM_ms:editedData.npm,
            Presensi:editedData.presensi,
            Nilai_akhir: editedData.nilaiAkhir,
            Grade:editedData.nilaiAkhir,
            tahun_ajaran:"2020/2021"
            
        })
            .then(() => {
                alert('Data berhasil diperbarui.');
                // Redirect kembali ke halaman sebelumnya
                window.history.back();
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });
    };

    // Fungsi untuk mengubah data yang akan diedit
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='flex font-poppins flex-col items-center justify-center h-[100vh]'>
            <h2 className='text-[32px] font-semibold'>Edit Data</h2>
            <form className='border px-8 py-4 flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                    <label>Nama</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="Nama_mhs"
                        value={editedData.Nama_mhs}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3 '>
                    <label>NPM</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="npm"
                        value={editedData.npm}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Jurusan</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="Jurusan"
                        value={editedData.Jurusan}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Email</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Presensi</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="presensi"
                        value={editedData.presensi}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Nilai Akhir</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="nilaiAkhir"
                        value={editedData.nilaiAkhir}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Grade</label>
                    <input
                        type="text"
                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                        name="grade"
                        value={editedData.grade}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={saveChanges}>Simpan</button>
            </form>
        </div>
    );
};

export default Editnilai;
