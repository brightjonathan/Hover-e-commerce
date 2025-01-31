import {useState} from 'react';
import styles from './auth.module.scss';
import loginImg from '../../Assests/logingif.gif';
import { Link, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import Card from '../../Components/Card/Card';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../Firebase/Firebase-config';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';


const errorMsg =(
  <p className='text-2xl'> Invalid credentail </p>
);

const successmsg = (
  <p className='text-2xl'>Login successfully</p>
)



const Login = () => {

  //navigator 
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');


  //loading state
  const [loadingState, setloadingState] = useState(false);

  //toggling for password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => {
    setPasswordEye(!passwordEye)
  }

  const LogInUser = async (e)=>{
    e.preventDefault();

    setloadingState(true)

    try {
      if (Email && Password) {
       await signInWithEmailAndPassword(
          auth, Email, Password
        )
        toast.success(successmsg);
        setloadingState(false); 
        navigate('/')
      }
    } catch (error) {
      toast.error(errorMsg)
      setloadingState(false);
      console.log(error)
    }
  }


  //Google signUp func..
  const signinwithgoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
      const user = result.user
      toast.success(successmsg);
      navigate('/');
    })
};


  return (
    <>
    {loadingState && <Loader />}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
         <img src={loginImg} alt="loginImg" width='400'/>
        </div>

        <Card>
        <div className={styles.form}>
           <h2>Login</h2>
           
           <form autoComplete='off' onSubmit={LogInUser}>
           
            <input
            id='email' 
            type="email" 
            placeholder='email' 
            required
            value={Email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            
            <div className='my-2 w-full relative'>
            <input 
            id='password' 
            type={(passwordEye === false) ? 'password' : 'text'} 
            placeholder='password' 
            required
            value={Password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <div className='absolute right-2 top-6'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>

            <button type='submit' className='--btn --btn-primary --btn-block '>Login</button>

            <div className={styles.links}>
               <Link to='/reset-password'> Reset Password</Link>
            </div>

            <p>-- or --</p>
           </form>
           

           <button onClick={signinwithgoogle} className='--btn --btn-danger --btn-block '> <FcGoogle size={25} /> Login with Google</button>
            <span className={styles.register}> 
                <p>Don't have an account?</p> 
                <Link to='/register'> Register</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Login;


