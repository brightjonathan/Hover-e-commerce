import React from 'react';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ALL Directories
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'
import Reset from './Pages/Auth/Reset';
import Page404 from './Pages/PageNotFound/Page404';
import Term from './Pages/Policies/Terms_and_condition';
import Polices from './Pages/Policies/Privacy_and_Policy';
import AdminOnlyRoute from './Components/AdminOnlyRoute/AdminRoute';
import Admin from './Pages/Admin/Admin';
import ProductDetails from './Components/Product/productDetails/ProductDetails';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import Cart from './Pages/Cart/Cart';



const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/reset-password' element={<Reset/>}/>
        <Route path='/term-and-condition' element={ <Term/>}/>
        <Route path='/privacy-and-policy' element={ <Polices/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />


        {/*  */}
        <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />


       <Route path="/product-details/:id" element={<ProductDetails />} />
       <Route path="/order-history" element={<OrderHistory />} />
       <Route path="/cart" element={<Cart />} />

      </Routes>

      <Footer/>
        <ToastContainer position='top-right' theme="colored" />
    </BrowserRouter>
  )
}

export default App
