import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Card from "../Card/Card";
import styles from "./ProductReview.module.scss";
import { toast } from "react-toastify";
import { db } from "../../Firebase/Firebase-config";
import { selectuserid, selectfullname} from "../../Redux/Slice/AuthSlice";
import useFetchDocument from "../../CustomHooks/UseFetchDocument";
import spinnerImg from "../../Assests/loader.gif";

const ProductReview = () => {


    const [rate, setRate] = useState(0);
    const [review, setReview] = useState("");
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { document } = useFetchDocument("PRODUCTS", id);
    const userID = useSelector(selectuserid);
    const userName = useSelector(selectfullname);


    const submitReview = (e) => {
        e.preventDefault();
    
        const today = new Date();
        const date = today.toDateString();
        const reviewConfig = {
          userID,
          userName,
          productID: id,
          rate,
          review,
          reviewDate: date,
          createdAt: Timestamp.now().toDate(),
        };
        try {
          addDoc(collection(db, "REVIEWS"), reviewConfig);
          toast.success("Review submitted successfully");
          setRate(0);
          setReview("");
        } catch (error) {
          toast.error(error.message);
        }
      };


  return (
    <section className="pt-[12vh]">
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ProductReview;
