import {useEffect, useState} from 'react';
import styles from './Navbar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../../Redux/Slice/AuthSlice';  //selecting the admin name from redux
import { useDispatch } from 'react-redux';
import { auth } from '../../../Firebase/Firebase-config';
import {NavLink} from 'react-router-dom';


//Re-useable active link
const activeLink = ({isActive})=> (isActive ? `${styles.active}` : ' ')


const AdminNavBar = () => {

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
    <div className={styles.navbar}>
      <div className={styles.user}>
     <FaUserCircle size={40} color='#fff'/>
     <h4 className='text-2xl text-[white] pt-4'> Admin: &nbsp; {userName} </h4>
      </div>

      <nav>
       <ul>

        <li>
          <NavLink to='/admin/home' className={activeLink}> 
            Home 
          </NavLink>
        </li>

        <li>
          <NavLink to='/admin/all-products' className={activeLink}> 
            All products 
          </NavLink>
        </li>

        <li>
          <NavLink to='/admin/add-product/ADD' className={activeLink}> 
            Add Product
          </NavLink>
        </li>

        <li>
          <NavLink to='/admin/orders' className={activeLink}> 
            Orders
          </NavLink>
        </li>

       </ul>
      </nav>

    </div>
  )
}

export default AdminNavBar;


