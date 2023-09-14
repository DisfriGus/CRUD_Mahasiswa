import React, { useEffect, useState } from 'react'
import Navbar from '../../Component/Navbar'
import Layout from '../../Component/Layout'
import { TbSearch } from 'react-icons/tb'
import Summary from '../../Component/Summary'
import axios from 'axios'
import Chart from '../../Component/Chart'
import Table from '../../Component/Table'

const Index = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Data',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [jumlahOrangTua, setJumlahOrangTua] = useState(0)
    const [jumlahMahasiswa, setJumlahMahasiswa] = useState(0)
    const [jumlahNilai, setJumlahNilai] = useState(0)
    const [jumlahMatakuliah, setJumlahMataKuliah] = useState(0)
    const [jumlahAbsesnsi, setJumlahAbsensi] = useState(0)
    const [dataMahasiswa, setDataMahasiswa] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    const [dataMatakuliah, setDataMatakuliah] = useState([])
    const [dataNilai, setDataNilai] = useState([])
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mahasiswa = await axios.get('http://localhost:8080/mahasiswas');
                const nilai = await axios.get('http://localhost:8080/nilais')
                const mataKuliah = await axios.get('http://localhost:8080/matakuliahs')
                const orangTua = await axios.get('http://localhost:8080/orangtuas')
                const absensi = await axios.get('http://localhost:8080/absensis')
                const getAllData = await axios.get('http://localhost:8080/getall');
                const data = getAllData.data.data;
                setDataMahasiswa(mahasiswa.data.data.data)
                setDataAbsensi(absensi.data.data.data)
                setDataMatakuliah(mataKuliah.data.data.data)
                setDataNilai(nilai.data.data.data)
                setJumlahMahasiswa(mahasiswa.data.data.data.length)
                setJumlahNilai(nilai.data.data.data.length)
                setJumlahMataKuliah(mataKuliah.data.data.data.length)
                setJumlahOrangTua(orangTua.data.data.data.length)
                setJumlahAbsensi(absensi.data.data.data.length)
                const chartLabels = [`Orang Tua`, `Mahasiswa`, `Mata Kuliah`, `Nilai`, `Absesnsi`]
                const chartData = [jumlahOrangTua, jumlahMahasiswa, jumlahMatakuliah, jumlahNilai, jumlahAbsesnsi]

                setChartData({
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Data',
                            data: chartData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                const combinedData = data.mahasiswa.map((mahasiswa) => {
                    const nilai = data.nilai.find((n) => n.NPM_ms === mahasiswa.NPM);
                    const absensi = dataAbsensi.find((a) => a.NPM_ms === mahasiswa.NPM);
                    const matakuliah = dataMatakuliah.find((m) => m.NPM_ms === mahasiswa.NPM);
                    return {
                      ...mahasiswa,
                      nilai: nilai ? nilai.Nilai_akhir : '0',
                      absensi: nilai ? nilai.Presensi : '0',
                      matakuliah: matakuliah ? matakuliah.Matakuliah : 'Belum mengambil matakuliah',
                      grade: nilai ? nilai.Grade : '0',
                    };
                  });
                  setCombinedData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className='relative overflow-hidden font-poppins'>
            <Navbar />
            <Layout>
                <div className='bg-[#2A3342] text-white flex max-md:flex-col max-xl:gap-6 justify-between px-[52px] py-8 items-center rounded-md'>
                    <div>
                        <h1 className='text-[36px] font-bold mb-6'>Kelola Data Webservices ULB!</h1>
                        <p className='text-[#BBC3CF] '>Go global with our UI Resources and solutions</p>
                    </div>
                    <div>
                        <button className='bg-[#2AD167] py-4 px-6 rounded-lg'>Get Started</button>
                    </div>
                </div>
                <div className='my-6 lg:flex justify-between'>
                    <div className='mb-3'>
                        <h1 className='text-[#333F51] text-[20px] font-semibold'>Data Presensi</h1>
                        <p>{ }</p>
                    </div>
                    <div className='flex text-[20px] items-center px-3 py-[9px]  h-fit border rounded-xl w-full md:w-[300px]'>
                        <TbSearch className='absolute' />
                        <input type="text" className='pl-7 text-[14px] outline-none' />
                    </div>
                </div>
                <hr />
                <div className="mt-4 overflow-hidden border border-coolGray-100 rounded-md ">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <tr className="whitespace-nowrap h-11 bg-coolGray-50 bg-opacity-80 border-b border-coolGray-100">
                                <th className="px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    <div className="flex items-center">
                                        <input className="mr-3 w-4 h-4 bg-white rounded" type="checkbox" />
                                        <p>Nama & No NPM</p>
                                    </div>
                                </th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    Jurusan</th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-center">
                                    Email</th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    Absensi</th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    Nilai</th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    Grade</th>
                                <th className="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">
                                    Mata Kuliah</th>
                                <th className="whitespace-nowrap font-semibold text-xs text-coolGray-500 uppercase text-center">
                                </th>
                            </tr>
                            <tbody>
                                {combinedData.map(post => (
                                    <Table key={post.id} nama={post.Nama_mhs} npm={post.NPM}  nilai={post.nilai} jurusan={post.Jurusan} email={post.Email} absensi={post.absensi} grade={post.grade} mataKuliah={post.matakuliah} />
                                ))}
                            </tbody>






                        </table>
                    </div>
                </div>
                <div className="">
                    <section className="bg-coolGray-50 py-4">
                        <div className=" px-4 ">
                            <div className="p-6 border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard">
                                <h2 className="text-coolGray-900 text-lg font-semibold">Features Summary</h2>
                                <div className="flex flex-wrap items-center justify-between ">
                                    <div className="w-full lg:w-1/2 p-6">
                                        <div className="relative xl:top-4">
                                            <div className="chart-graph3-column">
                                                <Chart chartData={chartData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 p-6">
                                        <div className="flex flex-wrap -m-2">
                                            <Summary nilai={jumlahOrangTua} features={`Orang Tua`} style={`md:w-1/2`} />
                                            <Summary nilai={jumlahMahasiswa} features={`Mahasiswa`} style={`md:w-1/2`} />
                                            <Summary nilai={jumlahMatakuliah} features={`Mata Kuliah`} style={`md:w-1/4`} />
                                            <Summary nilai={jumlahAbsesnsi} features={`Absensi`} style={`md:w-1/4`} />
                                            <Summary nilai={jumlahNilai} features={`Nilai`} style={`md:w-1/4`} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div>

                </div>
            </Layout>
        </div>
    )
}

export default Index