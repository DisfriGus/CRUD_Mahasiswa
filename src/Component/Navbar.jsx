import React, { useState, useEffect } from 'react'
import { useUserContext } from './UserContext'
import { Link } from 'react-router-dom'
import { TbX, TbMenu2 } from 'react-icons/tb'
import axios from 'axios'

const Navbar = ({ isLogin }) => {
    const { userRole } = useUserContext()
    const [show, setShow] = useState(false)
    const [dataMahasiswa, setDataMahasiswa] = useState({
        nama: '',
        npm: '',
        jurusan: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/mahasiswa/64feab698bec931b8588f101');
                setDataMahasiswa(response.data.data.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={`max-xl:fixed w-full bg-[#2A3342] flex items-center py-4 px-4 xl:px-[160px] relative`}>
            <div className='flex justify-between w-full items-center'>
                <div className='flex items-center '>
                    <Link to={`/`}>
                        <svg width="118" height="40" viewBox="0 0 118 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path d="M67.8947 8.38908V12.8727H58.5347V17.7164H65.5384V22.0691H58.5347V31.3636H52.9384V8.38908H67.8947Z" fill="white" />
                            <path d="M76.4324 7.14545V31.3636H70.8361V7.14545H76.4324Z" fill="white" />
                            <path d="M97.7026 21.9382C97.7026 22.4618 97.6699 23.0073 97.6044 23.5745H84.939C85.0263 24.7091 85.3862 25.5818 86.019 26.1927C86.6735 26.7818 87.4699 27.0764 88.4081 27.0764C89.8044 27.0764 90.7753 26.4873 91.3208 25.3091H97.2772C96.9717 26.5091 96.4153 27.5891 95.6081 28.5491C94.8226 29.5091 93.8299 30.2618 92.6299 30.8073C91.4299 31.3527 90.0881 31.6254 88.6044 31.6254C86.8153 31.6254 85.2226 31.2436 83.8263 30.48C82.4299 29.7164 81.339 28.6254 80.5535 27.2073C79.7681 25.7891 79.3753 24.1309 79.3753 22.2327C79.3753 20.3345 79.7572 18.6764 80.5208 17.2582C81.3063 15.84 82.3972 14.7491 83.7935 13.9854C85.1899 13.2218 86.7935 12.84 88.6044 12.84C90.3717 12.84 91.9426 13.2109 93.3172 13.9527C94.6917 14.6945 95.7608 15.7527 96.5244 17.1273C97.3099 18.5018 97.7026 20.1054 97.7026 21.9382ZM91.9753 20.4654C91.9753 19.5054 91.6481 18.7418 90.9935 18.1745C90.339 17.6073 89.5208 17.3236 88.539 17.3236C87.6008 17.3236 86.8044 17.5964 86.1499 18.1418C85.5172 18.6873 85.1244 19.4618 84.9717 20.4654H91.9753Z" fill="white" />
                            <path d="M111.455 31.3636L107.953 26.2909L105.008 31.3636H98.9532L104.975 22.0364L98.7895 13.1018H105.073L108.575 18.1418L111.52 13.1018H117.575L111.455 22.2982L117.739 31.3636H111.455Z" fill="white" />
                            <path d="M18.2825 12.4325C23.7569 14.3646 29.6607 14.2573 35.0814 12.1642C35.135 9.96367 34.5447 7.76319 33.5249 5.77738L32.9882 4.70398C32.8272 4.75765 32.6125 4.865 32.5052 4.97234C27.5675 7.33383 21.9858 7.65585 16.7798 5.77739C13.1302 4.48931 9.15859 4.81132 5.72369 6.52878L4.65028 7.06548C4.70395 7.22649 4.8113 7.44116 4.91864 7.5485C5.56269 8.94393 6.09938 10.4467 6.47508 12.0031C10.232 10.9297 14.4183 11.0371 18.2825 12.4325Z" fill="#22C55E" />
                            <path d="M4.91835 28.5872L6.09909 27.9432C8.49157 26.7469 11.1309 26.1679 13.7497 26.2442C15.3607 26.2912 16.9638 26.5862 18.4969 27.1381C18.9963 27.3153 19.4974 27.478 19.9997 27.6263L19.9997 33.3471C17.9217 32.9608 15.8181 32.9055 13.7497 33.1718C11.6041 33.4481 9.49636 34.0702 7.49452 35.0276C7.38718 35.135 7.1725 35.2423 7.01148 35.296L6.47478 34.2226C5.56239 32.4515 5.02569 30.5193 4.91835 28.5872Z" fill="#22C55E" />
                            <path d="M5.56283 23.6494C10.1248 21.771 15.2235 21.6099 19.8928 23.2737C24.1864 24.7765 28.7484 25.0448 33.042 24.0788C32.9884 21.6636 33.3104 19.3021 34.1691 16.9406C28.5337 18.6044 22.469 18.4434 16.8336 16.4576C13.6134 15.2768 10.0711 15.2768 6.85092 16.3503C6.90459 18.6581 6.47524 21.0196 5.67019 23.3274C5.67019 23.3274 5.6165 23.4884 5.56283 23.6494Z" fill="#22C55E" />
                        </svg>
                    </Link>
                </div>
                {userRole === 'ADMIN' &&
                    <div className='max-xl:hidden list-none flex text-white gap-4'>
                        <Link to={`/InsertMahasiswa`}>Insert</Link>
                        <Link to={`/InsertDataNilai`}>Insert Nilai</Link>
                        <Link to={`/UpdateNilai`}>Update Nilai</Link>
                    </div>
                }
                {
                    userRole === 'USER' &&
                    <div className='max-xl:hidden list-none flex text-white gap-4'>
                        <Link to={`/LihatNilai`}>List Nilai</Link>
                        
                    </div>
                }
                <div className='max-xl:hidden flex items-center gap-3'>

                    <button className='text-white'><Link className='' to={`/Login`}>Masuk</Link></button>

                </div>
            </div>
            <button className="text-[#4D5F7A] text-[28px] bg-[#8896AB] xl:hidden" onClick={() => setShow(!show)}>
                {show ? <TbX /> : <TbMenu2 />}
            </button>
            <div className={`xl:hidden list-none absolute w-1/2 flex flex-col items-center transition-all duration-300 bg-[#2A3342] top-[70px] right-0 text-white gap-4 min-h-screen ${show ? 'translate-x-0' : 'translate-x-full'}`}>
                <div>

                    {userRole === 'ADMIN' &&
                        <div className='xl:hidden list-none flex flex-col text-white gap-4'>
                            <Link to={`/InsertMahasiswa`}>Insert</Link>
                            <Link to={`/InsertDataNilai`}>Insert Nilai</Link>
                            <Link to={`/UpdateNilai`}>Update Nilai</Link>
                        </div>
                    }
                    {
                        userRole === 'USER' &&
                        <div className='xl:hidden list-none flex flex-col text-white gap-4'>
                            <Link to={`/`}>List Nilai</Link>
                            <Link to={`/`}>List System</Link>
                        </div>
                    }
                </div>
                <div>
                    <button className='text-white'><Link className='' to={`/Login`}>Masuk</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar