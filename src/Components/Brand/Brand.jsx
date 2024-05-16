import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({item}) {
  return (
    <>
      <div className="col-md-2">
        <div className=' product cursor-pointer p-3 rounded-3 mb-2'>
          <Link to={'/product-of-brand/' + item._id }>
          <img src={item.image} className='w-100' alt="" />
          </Link>
        </div>
      </div>
    </>
  )
}
