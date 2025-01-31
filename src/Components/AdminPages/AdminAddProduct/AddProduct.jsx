import {useState} from 'react';
import styles from './AddProduct.module.scss';
import Card from '../../Card/Card'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../../Firebase/Firebase-config';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../Redux/Slice/ProductSlice';



//input initialState
const initialState = {
 ProductName: '',
 imageURL: '',
 Price: '',
 Category: '',
 Brand: '',
 Description: '',
}


//product categories array
const categories = [
  {id: 1, name: 'Laptop'},
  {id: 2, name: 'Shoes'},
  {id: 3, name: 'Phones'},
  {id: 4, name: 'Television'},
  {id: 5, name: 'Wears'},
  {id: 6, name: 'Electronices'},
];

//image success msg
const Imgsuccess = (
  <p className='text-2xl'> Image uploaded successfully </p>
  )
  
  
  //Submit form success msg
  const Productsuccess = (
    <p className='text-2xl'> Product uploaded successfully </p>
    )
    
    
    const AddProduct = () => {
      
      //navigating 
      const Navigate = useNavigate();
      
      //params (getting the Id )
      const {id} = useParams();
      
      
      //populating the product 
      const GettingProducts = useSelector(selectProducts)
      const productEdit = GettingProducts.find((item)=> item.id === id)
      //console.log(productEdit)
      
      //detecting the add product and the Edit product h2 tag
      const detectForm = (id, f1, f2) => {
        if (id === 'ADD') {
          return f1;
        } else {
          return f2;   
        }
      };

  
    
 //making the useState dynamic for the initailState and the ProductEdit
  const [Product, setProduct] = useState(()=>{
    const newState = detectForm(id,
      { ...initialState },
      productEdit
      )
      return newState
  });

  const [isLoading, setisLoading] = useState(false)
  
  //progress bar
  const [Progress, setProgress] = useState(0);
  
  //de-structuring
  const {ProductName, imageURL, Price, Category, Brand, Description} = Product;
  
  //handles the input change...
  const HandleInputChange = (e)=>{
    setProduct({...Product, [e.target.name]: e.target.value});
  };
  



//handles the image change...
const HandleImageChange = (e)=>{
  const file = e.target.files[0]
  
  //creating a folder called images
  const RandomID = new Date().getDate() * Math.floor(Math.random() * 2178634590)
  const storageRef = ref(storage, `ProductsImages/${RandomID + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progressBar =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setProgress(progressBar);
      //console.log(progressBar);
    },
    (error) => {
      toast.error(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({ ...Product, imageURL: downloadURL });
        toast.success(Imgsuccess);
      });
    }
  );
  
};

const SubmitProduct = async (e) => {
  e.preventDefault();

  //loading state to true
  setisLoading(true);

    //creating a collection in the firestore
    const collectionRef = collection(db, 'PRODUCTS');
     
    try {

      await addDoc(collectionRef,
        { 
          author: {
            Admin: auth.currentUser.displayName,
            id: auth.currentUser.uid,
            email: auth.currentUser.email
          },

          //getting the values
          ProductName: ProductName,
          imageURL: imageURL,
          Price: Number(Price),
          Category: Category,
          Brand: Brand,
          Description: Description, 
          CreatedAt: Timestamp.now().toDate(),
        });

        setisLoading(false);
        toast.success(Productsuccess);
        setProgress(0)

        //clearing the input field
        setProduct(initialState);
        Navigate('/admin/all-products');
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }

};


const EditProduct = async (e)=>{
  e.preventDefault();

  //loading state to true
  setisLoading(true);

  //delecting the previous image in the storage when updated
  if (imageURL !== productEdit.imageURL) {
    const storageRef = ref(storage, productEdit.imageURL);
    deleteObject(storageRef);
  }

  try {
   await setDoc(doc(db, 'PRODUCTS', id), {
      
      author: {
        Admin: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        email: auth.currentUser.email
      },

      //getting the values
      ProductName: ProductName,
      imageURL: imageURL,
      Price: Number(Price),
      Category: Category,
      Brand: Brand,
      Description: Description, 
      CreatedAt: productEdit.CreatedAt,
      EditedAt: Timestamp.now().toDate(),
    });
        setisLoading(false);
        toast.success(<p className='text-2xl'>Product Edited Successfully</p>);
        Navigate('/admin/all-products');
      
  } catch (error) {
    setisLoading(false);
    toast.error(error.message);
  }
}


  return (
    <>
    {isLoading && <Loader/>}


    <div className={styles.product}>
      <h2> {detectForm(id, 'Add new Product', 'Edit Product')} </h2>
     
     <Card cardClass={styles.Card}>
      <form onSubmit={detectForm(id, SubmitProduct , EditProduct)} >

      <label> Product name:</label>
      <input 
      type="text" 
      placeholder='product name' 
      required 
      name='ProductName'
      value={ProductName} 
      onChange={(e)=>HandleInputChange(e)} 
      />

     <label> Product image:</label>
     <Card cardClass={styles.group}>

      {Progress === 0 ? null : (
        <div className={styles.progress}>
        <div className={styles['progress-bar']} style={{width: `${Progress}%`}}> 
        {Progress < 100 ? `Uploading ${Progress.toFixed(0)}%` : `Upload completed ${Progress}%`}
        </div>
      </div>
      )}

       <input 
       type="file" 
       placeholder='Product imgage' 
       accept='image/*'  
       name='image' 
       onChange={(e)=> HandleImageChange(e)}
       />

      
       {Progress === '' ? null : (
        <input 
        type="text" 
        placeholder='image url'
        required 
        name='imageURL'
        disabled
        value={imageURL}
        />
       )}

     </Card>

     <label> Product price:</label> 
      <input 
      type="number" 
      placeholder='product price' 
      required 
      name='Price'
      value={Price} 
      onChange={(e)=>HandleInputChange(e)} 
      />

     <label> Product Category:</label>
      <select required name="Category" value={Category} onChange={(e)=>HandleInputChange(e)}>
        <option value="" disabled> -- choose product Category --</option>
        {categories.map((e)=>{
          return (
            <option key={e.id} value={e.name}> {e.name}</option>
          )
        })}
      </select>

      <label> Product Company/Brand:</label>
      <input 
      type="text" 
      placeholder='product name' 
      required 
      name='Brand'
      value={Brand} 
      onChange={(e)=>HandleInputChange(e)} 
      /> 

      <label> Product Description:</label>
      <textarea
      required 
       name="Description"
       value={Description}
       onChange={(e)=> HandleInputChange(e)}
       cols="30" 
       rows="10"/>

       <button className='--btn --btn-primary'> {detectForm(id, 'Save Product', 'Update Product')}</button>

      </form>
     </Card>
      
    </div>
    </>
  )
}

export default AddProduct;



