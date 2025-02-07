import { useEffect, useState } from "react";
import Styles from './ProductDetails.module.scss';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import spinnerimg from '../../../Assests/loader.gif';
import StarsRating from "react-star-rate";
import useFetchDocument from "../../../CustomHooks/UseFetchDocument";
import useFetchCollection from "../../../CustomHooks/useFetchCollection";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../Redux/Slice/CartSlice";

const ProductDetails = () => {
 
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const cartItems = useSelector(selectCartItems);
  
  const { document } = useFetchDocument("PRODUCTS", id);
  //const { data } = useFetchCollection("reviews");
  //const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  


  return (
   <section className="pt-[12vh]">
      <div className={`container ${Styles.product}`}>
          <h2>Product Details</h2>
          <div>
            <Link to='/#products'>&larr; Back to product </Link>
          </div>
          {product === null ? (<img src={spinnerimg} alt="spinnerImg" width={100}/>) : (
            <>
            <div className={Styles.details}>
               <div className={Styles.img}>
                 <img src={product.imageURL} alt={product.ProductName} />
               </div>
               <div className={Styles.content}>
                  <h3>{product.ProductName}</h3>
                  <p className={Styles.price}> &#8358;{product.Price.toLocaleString('en-us')}</p> 
                  <p className="">{product.Description}</p>
                  <p><b>SKU:</b> {product.id}</p>
                  <p><b>Brand:</b> {product.Brand}</p>

                  <div className={Styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button className="--btn" onClick={() => decreaseCart(product)} >
                        -
                      </button>
                      <p>
                        <b> {cart.cartQuantity}</b>
                      </p>
                      <button className="--btn" onClick={() => addToCart(product)}>
                        +
                      </button>
                    </>
                  )}
                  </div>

                  <button className="--btn --btn-danger"  onClick={() => addToCart(product)} >ADD TO CART</button>
               </div>
            </div>
            </>
          )}
      </div>
   </section>
  )
};

export default ProductDetails;

