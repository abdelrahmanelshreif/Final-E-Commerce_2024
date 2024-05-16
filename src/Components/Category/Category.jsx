import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({item}) {
  return (
    <>
      <div className="col-md-4">
        <div className='category product cursor-pointer p-3 rounded-3 mb-2'>
          <Link to={'/product-of-category/' + item._id }>
          <img src={item.image} className='w-100' alt="" />
            <h3 className='text-center text-main fw-semibold fs-2 mt-3'>{item.name}</h3>
          </Link>
        </div>
      </div>
    </>
  )
}
