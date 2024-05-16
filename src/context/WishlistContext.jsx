
import axios from 'axios'
import React, { createContext, useState } from 'react'


export const wishlistContext = createContext(0)

function addToWishlist(productId){
    return axios.post('https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/wishlist/add' , {productId} , 
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
    }
    ).then(({data}) => data).catch(err => err)
}


function getWishlist(){
  return axios.get('https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/wishlist' , 
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
  }
  }
  ).then(({data}) => data).catch(err => err)
}


function deleteFromWishlist(productId){
  return axios.patch(`https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/wishlist/remove/${productId}`, 
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
  }
  }
  ).then(({data}) => data).catch(err => err)
}

export default function WishlistContextProvider({children}) {

    let [count, setCount] = useState(0) 


  return <wishlistContext.Provider value={{count , setCount , addToWishlist , getWishlist , deleteFromWishlist}}>
    {children}
  </wishlistContext.Provider>
  
}

