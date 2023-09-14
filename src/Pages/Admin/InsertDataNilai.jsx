import React, { useState, useEffect } from 'react'
import Navbar from '../../Component/Navbar'
import Layout from '../../Component/Layout'
import axios from 'axios'
const InsertDataNilai = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([])
  const [postData, setPostData] = useState({
    npm: '',
    presensi: '',
    nilaiAkhir: '',
    grade: '',
    tahunAjaran: ''

  })
  const changeHandling = (e) => {
    setPostData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      }
    })

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mahasiswaResponse = await axios.get('http://localhost:8080/mahasiswas')
        const mahasiswaData = mahasiswaResponse.data.data.data
        setDataMahasiswa(mahasiswaData);

        mahasiswaData.forEach((mahasiswa) => {
          console.log(mahasiswa.Nama_mhs);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [selectedNamaMhs, setSelectedNamaMhs] = useState('');
  const [npm, setNpm] = useState('')

  const handleNamaMhsChange = (e) => {
    const selectedNama = e.target.value;
    setSelectedNamaMhs(selectedNama);


    const selectedMahasiswa = dataMahasiswa.find((mahasiswa) => mahasiswa.Nama_mhs === selectedNama);

    if (selectedMahasiswa) {
      setNpm(selectedMahasiswa.NPM);
    } else {
      setNpm('');
    }
  };
  const handleFormSubmit = async (e) => {
    try {
      await axios.post('http://localhost:8080/nilai', {
        NPM_ms: postData.npm,
        Presensi: postData.presensi,
        Nilai_akhir: postData.nilaiAkhir,
        Grade: postData.grade,
        Tahun_ajaran: postData.tahunAjaran
      });

      setPostData({
        npm: '',
        presensi: '',
        nilaiAkhir: '',
        grade: '',
        tahunAjaran: ''
      });
      setSelectedNamaMhs('Mahasiswa')
      setNpm('')
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
              <h1 className='text-[24px] font-bold text-[#2A3342]'>Insert Data Nilai</h1>
              <p className=' text-[#556987]' >Presensi Mahasiswa</p>
            </div>
            <div className='flex flex-col md:flex-row gap-3 md:gap-4'>
              <button className='py-2 px-4 bg-[#2AD167] rounded-md text-white ' onClick={handleFormSubmit} >Save</button>
              <button className='py-2 px-4 border  rounded-md' >Cancel</button>
            </div>
          </div>
          <div className='flex flex-col gap-6 w-full '>
            <hr />
            <div className='flex w-full 2xl:w-[500px] justify-between md:items-start'>

              <p className='text-[#333F51] font-bold  '>Mahasiswa</p>
              <select
                name="mahasiswa"
                value={selectedNamaMhs}
                id="mahasiswa"
                className='border py-2 px-4'
                onChange={handleNamaMhsChange}
              >
                <option value="">Mahasiswa</option>
                {dataMahasiswa.map(item => (
                  <option key={item.id} value={item.Nama_mhs}>
                    {item.Nama_mhs}
                  </option>
                ))}
              </select>

            </div>
            <hr />
            <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
              <p className='text-[#333F51] font-bold mb-6 '>NPM</p>
              <input id='npm' value={postData.npm = npm} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={handleNamaMhsChange} readOnly={true} />
            </div>
            <hr />
            <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
              <p className='text-[#333F51] font-bold mb-6 '>Presensi</p>
              <input id='presensi' value={postData.presensi} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
            </div>
            <hr />
            <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
              <p className='text-[#333F51] font-bold mb-6 '>Nilai Akhir</p>
              <input id='nilaiAkhir' value={postData.nilaiAkhir} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
            </div>
            <hr />
            <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
              <p className='text-[#333F51] font-bold mb-6 '>Grade</p>
              <input id='grade' value={postData.grade} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
            </div>
            <hr />
            <div className='flex w-full 2xl:w-[1115px] max-2xl:flex-col justify-between md:items-start'>
              <p className='text-[#333F51] font-bold mb-6 '>Tahun Ajaran</p>
              <input id='tahunAjaran' value={postData.tahunAjaran} className='w-full xl:w-[685px] py-3 border border-[#9CA3AF] rounded-md pl-4 outline-none' type="text" onChange={changeHandling} />
            </div>
            <hr />

          </div>

        </div>

      </Layout>
    </div>
  )
}

export default InsertDataNilai