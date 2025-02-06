import { useEffect, useMemo } from "react";
import InfoBox from "../../../Components/InfoBox/InforBox";
import styles from "./Home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
   STORE_PRODUCTs,
} from "../../../Redux/Slice/ProductSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../Redux/Slice/OrderSlice";
import useFetchCollection from "../../../CustomHooks/useFetchCollection";
import Chart from "../../Chart/Chart";


//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const AdminHome = () => {


  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (fbProducts.data?.length > 0) {
      dispatch(
        STORE_PRODUCTs({
          products: fbProducts.data,
        })
      );
    }
  
    if (data?.length > 0) {
      dispatch(STORE_ORDERS(data));
      dispatch(CALC_TOTAL_ORDER_AMOUNT());
    }
  }, [dispatch, fbProducts.data, data]); // ✅ Only depends on `data`, not entire `fbProducts`
  
  
  
  
  return (
    <div className={styles.home}>
    <h2>Admin Home</h2>
    <div className={styles["info-box"]}>
      <InfoBox
        cardClass={`${styles.card} ${styles.card1}`}
        title={"Earnings"}
        count={`$${totalOrderAmount}`}
        icon={earningIcon}
        />
      <InfoBox
        cardClass={`${styles.card} ${styles.card2}`}
        title={"Products"}
        count={products.length}
        icon={productIcon}
        />
      <InfoBox
        cardClass={`${styles.card} ${styles.card3}`}
        title={"Orders"}
        count={orders.length}
        icon={ordersIcon}
      />
    </div>
    <div>
      <Chart />
    </div>
  </div>
  )
}

export default AdminHome;



// useEffect(() => {
//   dispatch(
//     STORE_PRODUCTs({
//       products: fbProducts.data,
//     })
//   );

//   dispatch(STORE_ORDERS(data));

//   dispatch(CALC_TOTAL_ORDER_AMOUNT());
// }, [dispatch, data, fbProducts]);