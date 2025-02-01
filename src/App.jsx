import React from 'react';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
// import Contact from './Pages/Contact/Contact';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'
import Reset from './Pages/Auth/Reset'
import Page404 from './Pages/PageNotFound/Page404';
import Term from './Pages/Policies/Terms_and_condition';
import Polices from './Pages/Policies/Privacy_and_Policy'



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

        {/* <Route path="/contact" element={<Contact />} /> */}


        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer/>
        <ToastContainer position='top-right' theme="colored" />
    </BrowserRouter>
  )
}

export default App
