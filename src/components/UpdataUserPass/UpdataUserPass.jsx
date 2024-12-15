import React, { useContext, useEffect, useState } from 'react'
import style from './UpdataUserPass.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { userContex } from '../../context/userContext'

export default function UpdataUserPass() {
  let navigate =useNavigate()
  let {setUserLogin, setUserInfo} =useContext(userContex);

  const[isLoading,setLoading]=useState(false);


  async function handleUpdatePassword(value){
    console.log(value)
    setLoading(true);
    await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',value)
    .then(async function(data){
      setLoading(false)
      toast.success('User created successfully !')
      console.log(data)
      localStorage.setItem('token',data?.data?.token)
      setUserLogin(true);
      navigate('/')
      let user=jwtDecode(data?.data?.token)
      setUserInfo(user)

    })
    .catch(function(err){
      setLoading(false)
    console.log(err)

    }
  );
  }

let validationSchema=Yup.object().shape({
  
  email:Yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,'Enter a valid email') .required('Email is required'),
  newPassword:Yup.string().min(6,'Minimun length 6 letter').required('password is required'),
})

  const formik = useFormik({
    initialValues:{
      "email":"",
      "newPassword":"",
    },
    onSubmit:handleUpdatePassword,
    validationSchema
    
  });


   
  return (
    <>
     <div className='flex flex-col items-center  '>
     <h2 className='text-green-600 font-bold mt-4 text-[24px] sm:text-[30px] flex items-center  gap-2'>
  <svg viewBox="0 0 512 512" fill={'#03543f'} width={'30px'} xmlns="http://www.w3.org/2000/svg"><g id="Change_password"><path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z" /><path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z" /><path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z" /><path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z" /></g></svg>
  Update Password
  </h2>
  <form className="w-[90%]  lg:w-[50%] sm:pt-4 " onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full  sm:mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email"  value={formik.values.email}  name="email" id="floating_email" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email &&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.email}</p> }

  <div className="relative z-0 w-full  sm:mb-2 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.newPassword} type="password"  name="newPassword" id="floating_password" className="block py-2 sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
  </div>
  {formik.errors.newPassword&& formik.touched.newPassword&&<p className='p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>{formik.errors.newPassword}</p> }





  <button type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading? <i className='fas fa-spin fa-spinner'></i>:'Submit'}</button>
</form>
  </div>
    </>
  )
}
