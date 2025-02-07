import {useEffect, useState} from 'react';
import styles from './ViewProducts.module.scss';
import { toast } from 'react-toastify';
import { db, storage } from '../../../Firebase/Firebase-config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import Loader from '../../Loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from "notiflix";
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTs, selectProducts } from '../../../Redux/Slice/ProductSlice';
import useFetchCollection from '../../../CustomHooks/useFetchCollection';



//image success msg
const Deletesuccess = (
  <p className='text-2xl'> Product deleted successfully </p>
);


const ViewProduct = () => {

  const {Data, IsLoading} = useFetchCollection("PRODUCTS")

  const dispatch = useDispatch();

  const selectorProduct = useSelector(selectProducts);
  

  useEffect(()=>{
           //storing it in the Redux state
        dispatch(STORE_PRODUCTs({
           products: Data
        })); 


  },[dispatch, Data])


  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        DeleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };



  //delete func...
  const DeleteProduct = async (id, imageURL)=>{
    
    try {
      //deleting the doc... using the 
      await deleteDoc(doc(db, "PRODUCTS", id));

      //deleting the image in the storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success(Deletesuccess);
      
    } catch (error) {
      toast.error(<p className='text-xl'>{error.message}</p>);
    }
  };


  return (
    <>
    {IsLoading && <Loader />}
    <div className={styles.table}>
      <h2 className='pt-[10vh]'> View All Product </h2> 

      {selectorProduct.length === 0 ? (<p> No product found </p>):(
        <table>
          <thead>
          <tr>
            <th> s/n </th>
            <th> Image </th>
            <th> Name </th>
            <th> Category </th>
            <th> Price </th>
            <th> Actions</th>
          </tr>
          </thead>
          <tbody>
          {selectorProduct.map((product, index)=>{
            //de-structuring the product data 
             const { id, ProductName, imageURL, Price, Category } = product;

             //Added a comma func... to the Price
              let RealPrice = Price;
              RealPrice = Number(RealPrice).toLocaleString('en-US');

             return (
              <tr key={id}>
                 <td>{index + 1} </td>
                 <td> <img src={imageURL} alt={ProductName} style={{width: '100px' }}  loading='lazy' /></td>
                 <td>{ProductName}</td>
                 <td>{Category}</td>
                 <td> &#x20A6;{RealPrice}</td>
                 <td className={styles.icons}>
                  <Link to={`/admin/add-product/${id}`}> <FaEdit size={20} color='green'/> </Link>
                   &nbsp;
                   <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(id, imageURL)}/> 
                  </td>
              </tr>
             )
          })}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProduct;



  //all product useState
  //const [AllProduct, setAllProduct] = useState([]);

  //isloading state
  //const [IsLoading, setIsloading] = useState(false);

  //passing the func... in useEffect
  // useEffect(()=>{
  //   GetAllProducts();
  // },[]);


  //fetching all products
  // const GetAllProducts = ()=>{
  //   setIsloading(true);

  //   try {

  //     //getting the collection cluster(WHICH IS "PRODUCTS")
  //     const ProductRef = collection(db, "PRODUCTS");

  //      //querying to display the product in decending order
  //     const querying =  query(ProductRef, orderBy("CreatedAt", "desc"));

  //     onSnapshot(querying, (snapshot)=>{
  //       //getting all the data
  //       const allProductstate = snapshot.docs.map((doc)=>({
  //         id: doc.id,
  //         ...doc.data()
  //       }))
        
  //       //console.log(allProductstate);
  //       setAllProduct(allProductstate);
  //       setIsloading(false);

  //       //storing it in the Redux state
  //       dispatch(STORE_PRODUCTs({
  //          products: allProductstate
  //       }));

  //     });

  //   } catch (error) {
  //     setIsloading(false);
  //     toast.error(error.message);
  //   }
  // };
