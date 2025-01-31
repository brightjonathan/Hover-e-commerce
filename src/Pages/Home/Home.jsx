import { useEffect } from 'react';
import Partners from '../../Components/Header/Partners';
import Product from '../../Components/Product/Product';
import AdPage from './AdPage';
import Slider from '../../Components/Slider/Slider';
import UserName from '../../Components/Header/UserName';

const Home = () => {

  
//func... for the scroll effect
  const scrollToProduct = ()=>{
    const url =  window.location.href;
    if (url.includes('#products')) {
      window.scrollTo({
        top: 628.510,
        behavior: 'smooth'
      })
      return;
    }
  }

  useEffect(()=>{
    scrollToProduct();
  },[]);

  return (
    <div>
     <UserName/>
      <Slider />

      <AdPage/>
   

      <Product/>
      <Partners/>
    </div>
  )
};

export default Home;

