import React from 'react';
import style from './Admin.module.scss';
import { Route, Routes } from "react-router-dom";
import AdminNarBar from '../../Components/AdminPages/NavBar/AdminNavBar';
import AdminHome from '../../Components/AdminPages/AdminHome/AdminHome';
import ViewProduct from '../../Components/AdminPages/ViewProduct/ViewProduct';
import AddProduct from '../../Components/AdminPages/AdminAddProduct/AddProduct';
import AdminOrders from '../../Components/AdminPages/AdminOrders/AdminOrders';



const Admin = () => {
  return (
    <div className={style.admin}>
      <div className={style.navbar}> 
        <AdminNarBar />
      </div>
      <div className={style.content}>
        <Routes>
          <Route path="home" element={<AdminHome/>} />
          <Route path="all-products" element={<ViewProduct />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          { /* <Route path="order-details/:id" element={<OrderDetails />} /> */ }
        </Routes>
      </div>
    </div>
  )
}

export default Admin;


