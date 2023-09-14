import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Component/UserContext'
import Navbar from '../Component/Navbar';

const LoginForm = () => {
    const [isLogin, setIsLogin] =useState(false)
    const { setUserRole } = useUserContext()
    const history = useNavigate()
    const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: (values) => {
      // Send the form data to the server using Axios POST request
      axios.post('http://localhost:9000/user/login', values)
        .then(response => {
          console.log('Login successful:', response.data);
          if (response.data.user_type === 'USER') {
            // Jika jenis pengguna adalah user, arahkan ke halaman index
            setUserRole(response.data.user_type)
            history('/');
            setIsLogin(true)
        } else if (response.data.user_type === 'ADMIN') {
            // Jika jenis pengguna adalah admin, arahkan ke halaman insert
            setUserRole(response.data.user_type)
            history("/InsertMahasiswa");
            setIsLogin(true)
          }
        })
        .catch(error => {
         console.error('Login failed:', error);
         setIsLogin(false)
        });
    },
  });

  return (
    <>
    <Navbar isLogin={isLogin}/>
    <form onSubmit={formik.handleSubmit} className='border m-auto w-[400px] pt-[35%] xl:mt-[10%] xl:pt-10 px-5 py-10 flex flex-col gap-4'>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className='py-2 px-4 w-full border outline-none'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className='py-2 px-4 w-full border outline-none'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <p>Belum punya akun? <Link to="/Register" className='font-bold'>Signup</Link></p>
      <button type="submit">Login</button>
    </form>
    </>
  );
};

export default LoginForm;
