import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import { useQuery } from 'react-query'

export default function Products() {

  function getProducts(){
    return axios.get('https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/products')
  }


  let {data, isLoading} = useQuery('getProducts', getProducts)


  if(isLoading) return <Loading/>
  return (
    <>
     <div className="container">
      <div className="row my-4">
        {data?.data.data.docs.map(item=>{
          return <Product item={item} key={item._id}/>
        })}
      </div>
     </div>
    </>
  )
}
