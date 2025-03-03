import React, { useEffect, useState } from "react";
import styles from "./Checkoutform.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import spinnerImg from "../../Assests/loader.gif";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Card from "../Card/Card";
import CheckoutSummary from "../../Components/Checkoutsummery/Checkoutsummary";
import { selectemail, selectuserid } from "../..//Redux/Slice/AuthSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../Redux/Slice/CartSlice";
import { selectShippingAddress } from "../../Redux/Slice/CheckoutSlice";
import { db } from "../../Firebase/Firebase-config";

const Checkoutform = () => {

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);


    // Save order to Order History
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    setIsLoading(true);

    try {
        setIsLoading(false);
        toast.success("Payment successful");
        saveOrder();
    } catch (error) {
        toast.error(error.message);
    }

    setIsLoading(false);
  };



  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>payment Checkout</h3>
              <PaymentElement id={styles["payment-element"]} />
              <button
                disabled={isLoading}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Checkoutform;
