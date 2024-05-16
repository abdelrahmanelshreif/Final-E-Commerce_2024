import React from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Mainlayout from './Components/Layouts/MainLayOut/Mainlayout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Wishlist from './Components/Wishlist/Wishlist'
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import Authlayout from './Components/Layouts/Authlayout/Authlayout'
import NotFound from './Components/NotFound/NotFound'
import { Offline, Online } from "react-detect-offline";
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { ToastContainer } from 'react-toastify';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import ProductOfCategory from './Components/ProductOfCategory/ProductOfCategory'
import ProductOfBrand from './Components/ProductOfBrand/ProductOfBrand'
import CartContextProvider from './context/CartContext'
import Address from './Components/Address/Address'
import CategoriesSlider from './Components/CategoriesSlider/CategoriesSlider'
import WishlistContextProvider from './context/WishlistContext'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import VerificationCode from './Components/VerificationCode/VerificationCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import AllOrders from './Components/AllOrders/AllOrders'
import Crud from './Components/Crud/Crud'

export default function App() {

  let routes = createBrowserRouter([
    {path : '/', element : <Mainlayout/>, children : [
      {index:true, element:<ProtectedRoutes> <Home/> </ProtectedRoutes> },
      {path:'home', element: <ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path:'products', element: <ProtectedRoutes> <Products/> </ProtectedRoutes> },
      {path:'product-details/:id', element: <ProtectedRoutes> <ProductDetails/> </ProtectedRoutes> },
      {path:'categories', element: <ProtectedRoutes> <Categories/> </ProtectedRoutes> },
      {path:'product-of-category/:id', element: <ProtectedRoutes> <ProductOfCategory/> </ProtectedRoutes> },
      {path:'product-of-category/:id', element: <ProtectedRoutes>  <CategoriesSlider/> </ProtectedRoutes> },

      {path:'brands', element: <ProtectedRoutes> <Brands/> </ProtectedRoutes> },
      {path:'product-of-brand/:id', element: <ProtectedRoutes> <ProductOfBrand/> </ProtectedRoutes> },
      {path:'cart', element: <ProtectedRoutes> <Cart/> </ProtectedRoutes>},
      {path:'wishlist', element: <ProtectedRoutes> <Wishlist/> </ProtectedRoutes>},
      {path:'address/:id', element: <ProtectedRoutes> <Address/> </ProtectedRoutes>},
      {path:'allorders', element: <ProtectedRoutes> <AllOrders/> </ProtectedRoutes>},
      {path:'crud', element: <ProtectedRoutes> <Crud/> </ProtectedRoutes>},
      {path:'*', element: <NotFound/>}
    ]},
    {path : '/', element : <Authlayout/>, children : [
      {path:'signup', element: <Signup/>},
      {path:'signin', element: <Signin/>},
      {path:'forgot-password', element: <ForgotPassword/>},
      {path:'verification-code', element: <VerificationCode/>},
      {path:'reset-password', element: <ResetPassword/>},

    ]}
  ])


  return (
    <>


    <CartContextProvider>
      <WishlistContextProvider>
      <RouterProvider router={routes}/>
      </WishlistContextProvider>
    </CartContextProvider>
  
  
  <ToastContainer theme='colored' autoClose={1000}/>


    <Offline>
      <div className='offline'>You are offline Now!</div>
      </Offline>
     
    </>
  )
}