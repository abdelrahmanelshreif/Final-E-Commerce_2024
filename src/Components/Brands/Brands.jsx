import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import Brand from '../Brand/Brand'

export default function Brands() {

  function getBrands(){
    return axios.get('https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/brands')
  }


  let {data, isLoading} = useQuery('getBrands', getBrands)


  if(isLoading) return <Loading/>
  return (
    <>
     <div className="container">
      <div className="row my-4">
        {data?.data.data.docs.map(item=>{
          return <Brand item={item} key={item._id}/>
        })}
      </div>
     </div>
    </>
  )
}
