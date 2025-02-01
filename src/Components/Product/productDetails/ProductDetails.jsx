import { useEffect, useState } from "react";
import Styles from './ProductDetails.module.scss';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase-config";
import { toast } from "react-toastify";
import spinnerimg from '../../../Assests/loader.gif';

const ProductDetails = () => {
  const {id} = useParams();

  const [ProductDetails, setProductDetails] = useState(null);
  
  
  const getProduct = async()=>{
    const docRef = doc(db, "PRODUCTS", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {

      //getting the id of the data 
      const obj = {
        id: id,
        ...docSnap.data()
      };

      setProductDetails(obj); 
    } else {
      toast.error(<p className='text-2xl'> Product not found </p>)
    }
  }
  
  useEffect(()=>{
    getProduct()
  },[]);
  


  return (
   <section>
      <div className={`container ${Styles.product}`}>
          <h2>Product Details</h2>
          <div>
            <Link to='/#products'>&larr; Back to product </Link>
          </div>
          {ProductDetails === null ? (<img src={spinnerimg} alt="spinnerImg" width={100}/>) : (
            <>
            <div className={Styles.details}>
               <div className={Styles.img}>
                 <img src={ProductDetails.imageURL} alt={ProductDetails.ProductName} />
               </div>
               <div className={Styles.content}>
                  <h3>{ProductDetails.ProductName}</h3>
                  <p className={Styles.price}>{ProductDetails.Price}</p> 
                  <p className="">{ProductDetails.Description}</p>
                  <p><b>SKU:</b> {ProductDetails.id}</p>
                  <p><b>Brand:</b> {ProductDetails.Brand}</p>

                  <div className={Styles.count}>
                      <button className="--btn bg-[gray]">-</button>
                      <p><b>1</b></p>
                      <button className="--btn bg-[gray]">+</button>
                  </div>

                  <button className="--btn --btn-danger">ADD TO CART</button>
               </div>
            </div>
            </>
          )}
      </div>
   </section>
  )
};

export default ProductDetails;

