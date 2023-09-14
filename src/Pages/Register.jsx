import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const history = useNavigate(); // Untuk mengakses objek history
    const [isRegistered, setIsRegistered] = useState(false);
    const formik = useFormik({
        initialValues: {
            First_name: '',
            Last_name: '',
            Password: '',
            Email: '',
            Phone: '',
            User_type: 'USER', // Default to USER
        },
        validationSchema: Yup.object({
            First_name: Yup.string()
                .required('First Name is required')
                .min(2, 'First Name must be at least 2 characters')
                .max(100, 'First Name must be at most 100 characters'),
            Last_name: Yup.string()
                .required('Last Name is required')
                .min(2, 'Last Name must be at least 2 characters')
                .max(100, 'Last Name must be at most 100 characters'),
            Password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            Email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            Phone: Yup.string()
                .required('Phone is required'),
        }),
        onSubmit: (values) => {
            // Kirim data pendaftaran ke server
            axios.post('http://localhost:9000/user/signup', values)
                .then(response => {
                    console.log('Registration successful:', response.data);
                    setIsRegistered(true);
                    history('/Login')
                })
                .catch(error => {
                    // Handle error
                    console.error('Registration error:', error);
                    // Handle registration failure or perform other actions
                });
        },
    });

    return (
        <div className='border m-auto w-[400px] pt-[35%] xl:mt-[10%] xl:pt-10 px-5 py-10 flex flex-col gap-4'>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit} className=''>
                <div>
                    <label htmlFor="First_name">First Name</label>
                    <input
                        type="text"
                        className='py-2 px-4 w-full border outline-none'
                        id="First_name"
                        name="First_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.First_name}
                    />
                    {formik.touched.First_name && formik.errors.First_name ? (
                        <div className="error">{formik.errors.First_name}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="Last_name">Last Name</label>
                    <input
                        type="text"
                        className='py-2 px-4 w-full border outline-none'
                        id="Last_name"
                        name="Last_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Last_name}
                    />
                    {formik.touched.Last_name && formik.errors.Last_name ? (
                        <div className="error">{formik.errors.Last_name}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        className='py-2 px-4 w-full border outline-none'
                        id="Password"
                        name="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Password}
                    />
                    {formik.touched.Password && formik.errors.Password ? (
                        <div className="error">{formik.errors.Password}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        className='py-2 px-4 w-full border outline-none'
                        id="Email"
                        name="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Email}
                    />
                    {formik.touched.Email && formik.errors.Email ? (
                        <div className="error">{formik.errors.Email}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="Phone">Phone</label>
                    <input
                        type="text"
                        className='py-2 px-4 w-full border outline-none'
                        id="Phone"
                        name="Phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Phone}
                    />
                    {formik.touched.Phone && formik.errors.Phone ? (
                        <div className="error">{formik.errors.Phone}</div>
                    ) : null}
                </div>

                <button type="submit" className='py-2 px-4 w-full border outline-none mt-6'>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
