import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { cartContext } from '../../context/CartContext'



export default function Address() {

let {id} = useParams()
    let navigate = useNavigate()
    const [errorMsg,setErrorMsg]=useState('')
    const [btnLoading,setBtnLoading]=useState(true)
    let {pay} = useContext(cartContext)

    async function payOnline(values){
        setBtnLoading(false)
      let data = await pay(id , values)  
        if(data.status=="success"){
            window.location.href = data.session.url
        }
    }

    function validationSchema(){
        let schema = new Yup.object({
            details: Yup.string().required(),
            phone: Yup.string().matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ , 'Phone number is not valid').required(),
            city: Yup.string().required(),
        })

        return schema
    }


    let address=useFormik({
        initialValues : {
            details:'',
            phone:'',
            city:'',
        },
        validationSchema,
        onSubmit: (values)=>{
            payOnline(values)
        }  
    })
  return (
    <>
    <div className="container my-5">
    <div className='w-75 mx-auto'>
        
        <form onSubmit={address.handleSubmit}>
            <label htmlFor="details">Details:</label>
            <input onBlur={address.handleBlur} value={address.values.details} onChange={address.handleChange} type="text" name='details' className='form-control mb-3' id='details'/>


            
            {address.errors.details && address.touched.details?<div className="alert alert-danger">{address.errors.details}</div>:''}

            <label htmlFor="phone">Phone:</label>
            <input onBlur={address.handleBlur} value={address.values.phone} onChange={address.handleChange} type="number" name='phone' className='form-control mb-3' id='phone'/>

            {address.errors.phone && address.touched.phone?<div className="alert alert-danger">{address.errors.phone}</div>:''}

            <label htmlFor="city">City:</label>
            <input onBlur={address.handleBlur} value={address.values.city} onChange={address.handleChange} type="text" name='city' className='form-control mb-3' id='city'/>


            
            {address.errors.city && address.touched.city?<div className="alert alert-danger">{address.errors.city}</div>:''}


            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}


            <div className='d-flex justify-content-center'>
            <button disabled={!(address.dirty && address.isValid)} type='submit' className='btn bg-main text-white'>
                {btnLoading?'Pay now':<i className='fa fa-spinner fa-spin'></i>}
            </button>
            </div>
            
        </form>
      </div>
    </div>
      
    </>
  )
}