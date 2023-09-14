import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './Pages/Users/Index'
import Login from './Pages/Login'
import InsertMahasiswa from './Pages/Admin/InsertMahasiswa'
import InsertDataNilai from './Pages/Admin/InsertDataNilai'
import UpdateNilai from './Pages/Admin/UpdateNilai'
import Register from './Pages/Register'
import Editnilai from './Pages/Admin/Editnilai'
import LihatNilai from './Pages/Users/LihatNilai'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Index/>} />
      <Route path='/InsertMahasiswa' element={<InsertMahasiswa/>} />
      <Route path='/InsertDataNilai' element={<InsertDataNilai/>} />
      <Route path='/UpdateNilai' element={<UpdateNilai/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Register' element={<Register/>} />
      <Route path='/EditNilai/:id' element={<Editnilai/>} />
      <Route path='/LihatNilai' element={<LihatNilai/>} />
    </Routes>
  )
}

export default App