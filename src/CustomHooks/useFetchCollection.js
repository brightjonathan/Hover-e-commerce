import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import { toast } from "react-toastify";


const useFetchCollection = (collectionName) => {

    //all product useState
  const [Data, setData] = useState([]);

  //isloading state
  const [IsLoading, setIsloading] = useState(false);
   
    
  //fetching all products
  const GetCollection = ()=>{
    setIsloading(true);

    try {

      //getting the collection cluster(WHICH IS "PRODUCTS")
      const docRef = collection(db, collectionName);

       //querying to display the product in decending order
      const querying =  query(docRef, orderBy("CreatedAt", "desc"));

      onSnapshot(querying, (snapshot)=>{
        //getting all the data
        const allData = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        
        //console.log(allData);
        setData(allData);
        setIsloading(false);


      });

    } catch (error) {
      setIsloading(false);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
     GetCollection()
  },[])

  return {Data, IsLoading}
}

export default useFetchCollection;
