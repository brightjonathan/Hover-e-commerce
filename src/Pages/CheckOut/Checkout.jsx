import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../Redux/Slice/CartSlice";
import { selectemail } from "../../Redux/Slice/AuthSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import CheckoutForm from "../../Components/CheckOutForm/Checkoutform";

const Checkout = () => {

  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectemail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;


  return (
       <>
      <section>
        <div className="container">{!clientSecret && <h3 className=" mt-[10vh]">{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default Checkout;
