import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function ResetPassword() {


    let navigate = useNavigate()

    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(email, newPassword){
        setLoading(false)
         axios.post('https://example.com' , {email , newPassword}).then(({data})=>{
            if(data.statusMsg=='success'){
                navigate('/home')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , 'You need Minimum eight characters, at least one uppercase letter, one lowercase letter and one number').required(),
        })

        return schema
    }


    let reset=useFormik({
        initialValues : {
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit: (values)=>{
            sendDataToApi(values)
        }  
    })
  return (
    <>
    <div className="container my-5">
    <div className='w-75 mx-auto'>
        <form onSubmit={reset.handleSubmit}>

            <label htmlFor="email">Email:</label>
            <input onBlur={reset.handleBlur} value={reset.values.email} onChange={reset.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>

            {reset.errors.email && reset.touched.email?<div className="alert alert-danger">{reset.errors.email}</div>:''}

            <label htmlFor="password">New Password:</label>
            <input onBlur={reset.handleBlur} value={reset.values.password} onChange={reset.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>

            {reset.errors.password && reset.touched.password?<div className="alert alert-danger">{reset.errors.password}</div>:''}

           
            


            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}




            <button disabled={!(reset.dirty && reset.isValid)} type='submit' className='btn bg-main text-white'>
                {loading?'Signup':<i className='fa fa-spinner fa-spin'></i>}
            </button>
        </form>
      </div>
    </div>
      
    </>
  )
}
