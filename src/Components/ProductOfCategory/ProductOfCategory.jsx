import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'

export default function ProductOfBrand() {

    let x = useParams()
    
    let [productsOF, setProductsOF] = useState([]) // Initialize as an empty array
    let [loading, setLoading] = useState(true)

    async function getProductsFromBrand(){
        try {
            let { data } = await axios.get(`https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/products?category=${x.id}`)
            setProductsOF(data.data.docs) // Set productsOF to data.data.docs, assuming docs contains the array of products
            setLoading(false)
        } catch (error) {
            console.error("Error fetching products:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductsFromBrand()
    }, [])
    
    if(loading) return <Loading/>

    return (
        <>
            <div className="container">
                <div className="row my-4">
                    {productsOF.map(item => (
                        <Product item={item} key={item._id}/>
                    ))}
                </div>
            </div>
        </>
    )
}
