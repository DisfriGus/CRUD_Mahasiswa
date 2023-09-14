import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import Layout from '../../Component/Layout';
import TableUpdateDelete from '../../Component/TableUpdateDelete';
import EditNilai from '../../Component/EditNilai';
const UpdateNilai = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [editId, setEditId] = useState(null)
  const fetchData = async () => {
    try {
      const getAllData = await axios.get('http://localhost:8080/getall');
      const data = getAllData.data.data;
      const combinedData = data.mahasiswa.map((mahasiswa) => {
        const nilai = data.nilai.find((n) => n.NPM_ms === mahasiswa.NPM);
        const absensi = data.nilai.find((a) => a.NPM_ms === mahasiswa.NPM);
        const matakuliah = data.nilai.find((m) => m.NPM_ms === mahasiswa.NPM);
        return {
          ...mahasiswa,
          nilai: nilai ? nilai.Nilai_akhir : '0',
          absensi: absensi ? absensi.Presensi : '0',
          grade: matakuliah ? matakuliah.Grade : '0',
        };
      });
      setCombinedData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Fungsi untuk menangani klik tombol Edit
  const handleEdit = (id) => {
    console.log(`id= ${id}`)
    setEditId(id)
  };


  // Fungsi untuk menangani klik tombol Hapus
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/mahasiswa/${id}`)
      .then(() => {
        alert(`Data dengan NPM ${id} telah dihapus.`);
        
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

  };

  return (
    <div>
      <Navbar />
      <Layout style={`flex flex-col gap-10`}>
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
                
              </tr>
              {combinedData.map(post => (
                <TableUpdateDelete key={post.id} nama={post.Nama_mhs} npm={post.NPM} nilai={post.nilai} jurusan={post.Jurusan} email={post.Email} absensi={post.absensi} grade={post.grade} mataKuliah={post.matakuliah}
                  id={post.id}
                  onDeleteClick={() => handleDelete(post.id)} />
              ))}

            </table>
          </div>
        </div>
      </Layout>
      
    </div>
  );
};

export default UpdateNilai;
