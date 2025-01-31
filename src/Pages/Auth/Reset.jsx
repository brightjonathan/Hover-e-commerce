import {useState} from 'react'
import resetImg from '../../Assests/forgot.png';
import Card from '../../Components/Card/Card';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase-config';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';


const successmsg = (
  <p className='text-2xl'> check your email for a reset link </p>
);


const Reset = () => {

  //loading state
  const [loadingState, setloadingState] = useState(false)
  const [Email, setEmail] = useState('');


  //Re-set password func...
  const ResetPassword = (e)=>{
    e.preventDefault();
    setloadingState(true);

    sendPasswordResetEmail(auth, Email).then(()=>{
      setloadingState(false);
      toast.success(successmsg)
    }).catch((error)=>{
      setloadingState(false);
      console.log(error.message);
    })
  }

  return (
    <>
    {loadingState && <Loader/>}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
         <img src={resetImg} alt="resetImg" width='600'/>
        </div>

        <Card>
        <div className={styles.form}>
           <h2>Reset Password</h2>
           
           <form autoComplete='off' onSubmit={ResetPassword}>
           
            <input
            id='email' 
            type="email" 
            placeholder='email'
            value={Email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            />

            <button type='submit' className='--btn --btn-primary --btn-block '>Reset Password</button>

            <div className={styles.links}>
               <p><Link to='/login'>- Login</Link></p> 
               <p><Link to='/register'>- Register</Link></p>
            </div>

            </form>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Reset;


