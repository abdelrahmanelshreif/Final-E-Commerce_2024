import axios from 'axios'
import React from 'react'
import Category from '../Category/Category'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'

export default function Categories() {

  function getCategories(){
    return axios.get('https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cateogries')
  }

  let {data, isLoading} = useQuery('getCategories', getCategories)

  if(isLoading) return <Loading/>

  return (
    <>
      <div className="container">
        <div className="row my-4">
          {data?.data?.data?.docs.map(item => { 
            return <Category item={item} key={item._id}/>
          })}
        </div>
      </div>
    </>
  )
}
