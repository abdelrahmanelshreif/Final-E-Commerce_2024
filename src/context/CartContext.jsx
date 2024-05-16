import axios from 'axios'
import React, { createContext, useState } from 'react'

export const cartContext = createContext(0)

export default function CartContextProvider({ children }) { 

    let [counter, setCounter] = useState(0)

    function addToCart(productId) {
      ;

        return axios.post(
            'https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cart/addToCart',
            { productId }, 
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        ).then(({ data }) => data).catch(err => err)
    }

    function getCart() {
        return axios.get(
            'https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/user/cart',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        ).then(({ data }) => data).catch(err => err)
    }

    function deletFromCart(productId) {
        return axios.delete(
            `https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cart/removeFromCart/${productId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        ).then(({ data }) => data).catch(err => err)
    }

    function updateCart(productId, count) {
        return axios.put(
            `https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cart/${productId}`,
            { count },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        ).then(({ data }) => data).catch(err => err)
    }

    function deleteCart() {
      return axios.delete(
          'https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/cart',
          {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
              }
          }
      ).then(({ data }) => data).catch(err => err)
  }

    function pay(cartId, shippingAddress) {
        return axios.post(
            `https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/order/addOrder/${cartId}`,
            { shippingAddress },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
        ).then(({ data }) => data).catch(err => err)
    }

    return (
        <cartContext.Provider value={{ counter, setCounter, addToCart, getCart, deletFromCart, updateCart, deleteCart, pay }}>
            {children}
        </cartContext.Provider>
    )
}
