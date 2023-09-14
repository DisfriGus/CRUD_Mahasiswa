import axios from 'axios';
import React, { useState, useEffect } from 'react'

const EditNilai = ({ showModal, onClose, onConfirm, getID }) => {
    const [dataMahasiswa, setDataMahasiswa] = useState({});
    const [idMahsasiswa, setIdMahasiswa] = useState('')
    const [postData, setPostData] = useState({
        nama: '',
        jurusan: '',
        email: '',
        npm: '',
        presensi: '',
        nilaiAkhir: '',
        grade: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mahasiswaResponse = await axios.get(`http://localhost:8080/mahasiswa/${getID}`);
                const mahasiswaData = mahasiswaResponse.data.data.data;
                setDataMahasiswa(mahasiswaData);


                setPostData((prevData) => ({
                    ...prevData,
                    nama: mahasiswaData.Nama_mhs,
                    npm: mahasiswaData.NPM,
                    jurusan: mahasiswaData.Jurusan,
                    email: mahasiswaData.Email

                }));
                const getAllData = await axios.get('http://localhost:8080/getall');
                const data = getAllData.data.data;
                const absensiData = data.nilai.find((absensi) => absensi.NPM_ms === mahasiswaData.NPM);
                setIdMahasiswa(absensiData.id)
                console.log(idMahsasiswa)
                console.log(`http://localhost:8080/mahasiswa/${getID}`)

                setPostData((prevData) => ({
                    ...prevData,
                    absensi: absensiData.Presensi,
                    nilaiAkhir: absensiData.Nilai_akhir,
                    grade: absensiData.Grade,
                    Tahun_ajara: '2021/2022'

                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [getID]); // Gunakan getID sebagai dependency agar pemanggilan ulang terjadi saat getID berubah.

    const changeHandling = (e) => {
        setPostData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };
    const handleEdit = async (id) => {
        try {
            console.log(`id Mahasiswa: ${id}`);
            console.log(`id Nilai: ${idMahsasiswa}`);

            const request1 = await axios.put(`http://localhost:8080/mahasiswa/${getID}`, {
                Nama_mhs: postData.nama,
                NPM: postData.npm,
                Jurusan: postData.jurusan,
                Email: postData.email
            });

            const request2 = await axios.put(`http://localhost:8080/nilai/${idMahsasiswa}`, {
                NPM_ms: postData.npm,
                Presensi: postData.presensi,
                Nilai_akhir: postData.nilaiAkhir,
                Grade: postData.grade,
                Tahun_ajaran: '2021/2022'
            });

            Promise.all([request1, request2])
                .then((responses) => {
                    // Handle respons jika berhasil
                    console.log('Berhasil memperbarui data mahasiswa:', responses[0].data);
                    console.log('Berhasil memperbarui data nilai:', responses[1].data);

                    alert(`Data dengan NPM ${postData.npm} telah diganti.`);
                    onClose();
                    // Lakukan tindakan lain, seperti memperbarui data lokal atau mereload data dari server.
                })
                .catch((error) => {
                    // Penanganan kesalahan jika ada
                    console.error('Gagal memperbarui data:', error);
                });
        } catch (err) {
            console.log(err);
        }
    };


    return (
        showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container w-[300px]">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Edit Data</h2>
                        <form>
                            <div className='flex gap-3'>
                                <div className="mb-4">
                                    <label className="block text-gray-600 font-bold mb-2" htmlFor="nama">
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={postData.nama}
                                        onChange={changeHandling}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600 font-bold mb-2" htmlFor="npm">
                                        NPM
                                    </label>
                                    <input
                                        type="text"
                                        id="npm"
                                        name="npm"
                                        value={postData.npm}
                                        onChange={changeHandling}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    />
                                </div>

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-bold mb-2" htmlFor="jurusan">
                                    Jurusan
                                </label>
                                <input
                                    type="text"
                                    id="jurusan"
                                    name="jurusan"
                                    value={postData.jurusan}
                                    onChange={changeHandling}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={postData.email}
                                    onChange={changeHandling}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-bold mb-2" htmlFor="nilai">
                                    Nilai
                                </label>
                                <input
                                    type="text"
                                    id="nilai"
                                    name="nilai"
                                    value={postData.nilaiAkhir}
                                    onChange={changeHandling}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-bold mb-2" htmlFor="absensi">
                                    Presensi
                                </label>
                                <input
                                    type="text"
                                    id="absensi"
                                    name="absensi"
                                    value={postData.absensi}
                                    onChange={changeHandling}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-bold mb-2" htmlFor="grade">
                                    Grade
                                </label>
                                <input
                                    type="text"
                                    id="grade"
                                    name="grade"
                                    value={postData.grade}
                                    onChange={changeHandling}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>

                        </form>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm(getID, handleEdit);
                                    onClose();
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditNilai