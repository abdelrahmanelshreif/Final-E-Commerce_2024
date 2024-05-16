import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function VerificationCode() {


    let navigate = useNavigate()
    
    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(resetCode){
        setLoading(false)
        let data = axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , {resetCode}).then(({data})=>{
            if(data.status=='success'){
                console.log(data)
                navigate('/reset-password')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            resetCode: Yup.number().required()
        })

        return schema
    }


    let verify=useFormik({
        initialValues : {
            resetCode:'',
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
        <form onSubmit={verify.handleSubmit}>

            <label className='mb-1 fw-bold' htmlFor="resetCode">Please enter your verification code:</label>
            <input onBlur={verify.handleBlur} value={verify.values.resetCode} onChange={verify.handleChange} type='number' name='resetCode' className='form-control mb-3' id='resetCode'/>

            {verify.errors.resetCode && verify.touched.resetCode?<div className="alert alert-danger">{verify.errors.resetCode}</div>:''}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}




            <button disabled={!(verify.dirty && verify.isValid)} type='submit' className='btn bg-main text-white'>
                {loading?'Verify':<i className='fa fa-spinner fa-spin'></i>}
            </button>
        </form>
      </div>
    </div>
      
    </>
  )
}