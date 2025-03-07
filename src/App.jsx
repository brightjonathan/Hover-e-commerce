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
import ProductReview from './Components/ProductReview/ProductReview';
import CheckOutDetails from './Pages/CheckOut/CheckOutDetails';
import Checkout from './Pages/CheckOut/Checkout';
import CheckOutSuccess from './Pages/CheckOut/CheckOutSuccess';



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
       <Route path="/cart" element={<Cart />} />
       <Route path="/order-history" element={<OrderHistory />} />
       <Route path='/review-product/:id' element={ <ProductReview/> }/>

       <Route path="/checkout-details" element={<CheckOutDetails />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/checkout-success" element={<CheckOutSuccess />} />

      </Routes>
      <Footer/>
    <ToastContainer position='top-right' theme="colored" />
    </BrowserRouter>
  )
}

export default App;


//things to complete
// 1. checkout-details
// 2. checkout
// 3. checkout-success
// 4. /order-details/:id
