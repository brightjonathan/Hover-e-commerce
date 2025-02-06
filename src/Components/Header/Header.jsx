import {useEffect, useState} from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {HiOutlineMenuAlt3, HiShoppingCart} from 'react-icons/hi'
import{FaShoppingCart, FaTimes} from 'react-icons/fa';
import logo from '../../Assests/kc logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase-config';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ShowOnLogIn, { ShowOnLogOut } from '../HiddenLink/HiddenLink';
import  { AdminRouteLink } from '../AdminOnlyRoute/AdminRoute';
import Notiflix from 'notiflix';
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../Redux/Slice/CartSlice";



//Re-useable Logo
const Logo = (
    <div className={styles.logo}>
    <Link to='/'><img src={logo} alt="logo" width={270} /></Link>
   </div>
);



//re-useable mobileCart
const mobileCart = (
  <span className={styles.cart}>
  <Link to='/cart'>  <p>0</p> <HiShoppingCart size={20}/></Link>
    </span>
);


const successmsg = (
  <p className='text-2xl'>Logout successfully</p>
);

//Re-useable active link
const activeLink = ({isActive})=> (isActive ? `${styles.active}` : ' ')

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ShowMenu, setShowMenu] = useState(false);

  //toggle func...
  const toggleMenu=()=>{
     setShowMenu(!ShowMenu);
  };

  //hide func...
  const hideMenu = ()=>{
    setShowMenu(false)
  };

  const LogOut = () =>{
      signOut(auth).then(()=>{
      navigate('/login');
      toast.success(successmsg)
    }).catch((error)=>{
       toast.error(error.message);
    })
  };


  const confirmLogOut = ()=>{
    Notiflix.Confirm.show(
      "Log out from your Account!!!",
      "You are about to Logout from your account",
      "Yes",
      "Cancel",
      function okCb() {
        LogOut();
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
    )
  }


  //CART
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);


  //Re-useable cart
const cart = (
  <span className={styles.cart}>
  <Link to="/cart">
    Cart
    <FaShoppingCart size={20} />
    <p>{cartTotalQuantity}</p>
  </Link>
</span>
);



  
  return (
    <header className='shadow-xl fixed z-10'>
        <div className={`${styles.header} `}>
          {Logo}
          <nav className={ShowMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
            
            <div onClick={hideMenu} className={ShowMenu ? `${styles['.nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}></div>

            <ul onClick={hideMenu} >
              <li className={styles['logo-mobile']}>{Logo} <FaTimes size={22} onClick={hideMenu} color='#fff'/> </li>
                  <li><NavLink to='/' className={activeLink}> Home </NavLink></li>


                   <li> 
                     <AdminRouteLink> 
                        <NavLink className={activeLink} to='/admin/home'>
                        <button className='--btn --btn-primary'> Admin </button> 
                        </NavLink> 
                      </AdminRouteLink> 
                   </li> 


                  <li><NavLink className={activeLink} to='/about'> About</NavLink ></li>
                  <li><NavLink className={activeLink} to='/contact'> Contact</NavLink ></li>
                  <li><NavLink className={activeLink} to='/business-Enquiry'> Business Enquiry</NavLink ></li>
            </ul>

            <div className={styles['header-right']} onClick={hideMenu} >

                  <span className={styles.links}>

                    <ShowOnLogOut>
                    <NavLink className={activeLink} to='/login'>LogIn</NavLink>
                    </ShowOnLogOut>
                                        
                    <ShowOnLogIn>
                    <NavLink className={activeLink} to='/order-history'>Order History</NavLink>
                    </ShowOnLogIn>
                    

                    <ShowOnLogIn>
                    <NavLink className={activeLink} to='/'   onClick={confirmLogOut}>Logout</NavLink>
                    </ShowOnLogIn>
                    
                  </span>

                  {cart}
                  </div> 
          </nav>

          {/* Mobile view */}
         <div className={styles['menu-icon']}>
          <div>{mobileCart}</div>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
         </div>

        </div>
    </header>
  )
}

export default Header;

