import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

export default function CategoriesSlider() {
    const [categories, setCategories] = useState([])

    async function getCategories() {
        try {
            const response = await axios.get("https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cateogries")
            setCategories(response.data.data.docs) // Adjusted here to access 'docs'
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
    };

    return (
      <div className='my-5'>
          <h2 className='text-center mb-3 fw-bold'>Shop popular categories</h2>
          <Slider {...settings}>
              {categories.length > 0 ? (
                  categories.map((item) => (
                      <Link to={'/product-of-category/' + item._id} key={item._id} className='category-slider'>
                          <img className='w-100 cursor-pointer' src={item.image} alt="" style={{ width: '200px', height: '200px' }} />
                      </Link>
                  ))
              ) : (
                  <p>Loading categories...</p>
              )}
          </Slider>
      </div>
  )
}  
