import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function ForgotPassword() {


    let navigate = useNavigate()

    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(email){
        setLoading(false)
         axios.post('https://example.com' , email).then(({data})=>{
            if(data.statusMsg=='success'){
                navigate('/verification-code')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            email: Yup.string().email().required(),
        })

        return schema
    }


    let forgot=useFormik({
        initialValues : {
            email:'',
        },
        validationSchema,
        onSubmit: (value)=>{
            sendDataToApi(value)
        }  
    })
  return (
    <>
    <div className="container my-5">
    <div className='w-75 mx-auto'>
        <form onSubmit={forgot.handleSubmit}>

            <label className='mb-1 fw-bold' htmlFor="email">Please enter your email:</label>
            <input onBlur={forgot.handleBlur} value={forgot.values.email} onChange={forgot.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>

            {forgot.errors.email && forgot.touched.email?<div className="alert alert-danger">{forgot.errors.email}</div>:''}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}




            <button disabled={!(forgot.dirty && forgot.isValid)} type='submit' className='btn bg-main text-white'>
                {loading?'Submit':<i className='fa fa-spinner fa-spin'></i>}
            </button>
        </form>
      </div>
    </div>
      
    </>
  )
}