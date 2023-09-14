import React, { useState, useEffect } from 'react'
import Layout from '../../Component/Layout'
import Navbar from '../../Component/Navbar'
import axios from 'axios'
const InsertMahasiswa = () => {
    const [postData, setPostData] = useState({
        nama: '',
        npm: '',
        jurusan: '',
        email: '',
        matakuliah: '',
        kehadiran: '',
        tanggal:''
    })

    const changeHandling = (e) => {
        setPostData((data) => {
            return {
                ...data,
                [e.target.id]: e.target.value,
            }
        })
        
    }
    const [matkul, setMatkul] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mataKuliah = await axios.get('http://localhost:8080/matakuliahs')
                setMatkul(mataKuliah.data.data.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e) => {

        try {

            await axios.post('http://localhost:8080/mahasiswa', {
                Nama_mhs: postData.nama,
                NPM: postData.npm,
                Jurusan: postData.jurusan,
                Email: postData.email
            });
            await axios.post('http://localhost:8080/asbensi', {
                Nama_mk: postData.matakuliah,
                Checkin: postData.kehadiran,
                Tanggal: postData.tanggal
            });
            
            setPostData({
                nama: '',
                npm: '',
                jurusan: '',
                email: '',
                matakuliah: '',
                kehadiran: '',
                tanggal:''
            });
        } catch (error) {
            console.error('Error saat mengirim data:', error);
        }
    }
    return (
        <div>
            <Navbar />
            <Layout>
                <div className='border rounded-xl  px-6 py-4'>
                    <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6' >
                        <div className='mb-4'>
                            <h1 className='text-[24px] font-bold text-[#2A3342]'>Insert Data Mahasiswa</h1>
                            <p className=' text-[#556987]' >Presensi Mahasiswa</p>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 md:gap-4'>
                            <button className='py-2 px-4 bg-[#2AD167] rounded-md text-white ' onClick={handleFormSubmit}>Save</button>
                            <button className='py-2 px-4 border  rounded-md' >Cancel</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-full '>
                        <hr />
                        <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Nama</p>
                            <input id='nama' value={postData.nama} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>NPM</p>
                            <input id='npm' value={postData.npm} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none ' type="number" onChange={changeHandling} />
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Jurusan</p>
                            <input id='jurusan' value={postData.jurusan} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Email</p>
                            <input id='email' value={postData.email} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[650px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Mata Kuliah</p>
                            <select
                                name="matakuliah"
                                value={postData.matakuliah}
                                id="matakuliah"
                                onChange={changeHandling}
                            >
                                <option value="">Mata Kuliah</option>
                                {matkul.map(item => (
                                    <option key={item.id} value={item.Nama_matkul}>
                                        {item.Nama_matkul}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[500px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Kehadiran</p>
                            <select
                                name="kehadiran"
                                value={postData.kehadiran}
                                id="kehadiran"
                                onChange={changeHandling}
                            >
                                <option value="Tidak">Tidak</option>
                                <option value="Hadir">Hadir</option>
                            </select>
                        </div>
                        <hr />
                        <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
                            <p className='text-[#333F51] font-bold mb-6 '>Email</p>
                            <input id='tanggal' value={postData.tanggal} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="date" onChange={changeHandling} />
                        </div>
                        <hr/>

                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default InsertMahasiswa