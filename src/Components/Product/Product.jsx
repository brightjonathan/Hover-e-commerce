import React from 'react'
import styles from './Product.module.scss';
import ProductFilters from './productfilter/ProductFilters'
import ProductList from './productList/ProductList'
import useFetchCollection from '../../CustomHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { STORE_PRODUCTs, selectProducts } from '../../Redux/Slice/ProductSlice';
import spinnerImg from '../../Assests/loader.gif'


const Product = () => {


  const {Data, IsLoading} = useFetchCollection("PRODUCTS")

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
   //console.log(products);
  

  useEffect(()=>{
           //storing it in the Redux state
        dispatch(STORE_PRODUCTs({
           products: Data
        })); 


  },[dispatch, Data]) 

  return (
    <section>
      <div className={`container ${styles.product}`}>

        {/* <aside className={styles.filter}>
        {IsLoading ? null : <ProductFilters/> }
        </aside> */}

        <div className={styles.content}>
          {IsLoading ? 
          ( <img src={spinnerImg} alt="Loading.." style={{ width: "30%" }} className="--center-all" />) 
          : (<ProductList products={products} />) 
          }
           
        </div>
        </div> 
    </section>
  )
}

export default Product; 


