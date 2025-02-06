import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../Firebase/Firebase-config';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../Redux/Slice/AuthSlice';
import ShowOnLogIn from '../HiddenLink/HiddenLink';

const UserName = () => {


    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');

    //monitoring current User state
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
 if(user) {
   //console.log(user)
   setUserName(user.displayName);

   //setting the active user state 
   dispatch(SET_ACTIVE_USER({
       email: user.email,
       fullname:user.displayName,
       userID: user.uid,
   }));
 } else{
   setUserName('');

   //dispatching or removing the user
   dispatch(REMOVE_ACTIVE_USER());
 }
    })
 }, [dispatch]);
 
  return (
    <div>
      <ShowOnLogIn> <p className='bg-transparent text-[20px] lg:w-[100%] p-4 lg:pt-[12vh] md:pt-[7vh]  sm:pt-[50vh] rounded text-center font-semibold'>Welcome, {userName} </p> </ShowOnLogIn>
    </div>
  )
}

export default UserName;