import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {cartContext} from '../../context/CartContext'
import { toast } from 'react-toastify'
import { wishlistContext } from '../../context/WishlistContext'

export default function Product({item}) {

 let { count,setCounter , addToCart} = useContext(cartContext)
 let { addToWishlist} = useContext(wishlistContext)
 let [loading,setLoading] = useState(true)
 let [style,setStyle] = useState(true)

 async function addProductToCart(productId){
  setLoading(false)
  let data = await addToCart(productId)
  if(data.status == 'success'){
    toast.success('Product added successfully to your cart')
    setCounter(data.numOfCartItems)
  }
  setLoading(true)
 }


 async function addProductToWishlist(productId){
  
  let data = await addToWishlist(productId)
  if(data.status == 'success'){
    toast.success('Product added successfully to your wishlist')
    setStyle(false)
  }
 }

  return (
    <>
     <div className="col-md-2">
          <div className="product cursor-pointer p-3 rounded-3 mb-2 ">
            <div className='position-relative'>
            <button onClick={() => addProductToWishlist(item._id)} className='position-absolute top-0 end-0 fs-3 border border-0 bg-transparent z-3'>
              {style?<i className="fa-regular fa-heart"></i>:<i className="fa-solid fa-heart text-danger"></i>}
            </button>
            </div>
          
            <Link to={'/product-details/' + item._id }>
              
              <img src={item.imageCover} className='w-100 mb-2' alt="" />
            <span className='text-main fw-semibold fs-6'>{item.category.name}</span>
            <p className='fw-bold mt-2'>{item.title.split(' ').slice(0,2).join(' ')}</p>
            <div className='d-flex justify-content-between mb-2'>
            <div>
              {item.price} EGP
            </div>
            <div>
            <i className="fa-solid fa-star rating-color"></i>
              {item.ratingsAverage}
            </div>
            </div>
              
            </Link>
            <button disabled={!loading} onClick={() => addProductToCart(item._id)} className='btn bg-main w-100 text-white'>
            {loading?'Add to cart':<i className='fa fa-spinner fa-spin'></i>}
              </button>
          </div>
        </div> 
    </>
  )
}
