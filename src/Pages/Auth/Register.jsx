import {useState} from 'react'
import styles from './auth.module.scss';
import RegisterImg from '../../Assests/register.gif';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { basicSchema } from './Schema/SchemaIndex';
import Card from '../../Components/Card/Card';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth } from '../../Firebase/Firebase-config';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';


const errorMsg = (
  <p className='text-2xl'>User already existed</p>
);

const successmsg = (
  <p className='text-2xl'>Register successfully</p>
)

const Register = () => {

  //navigator 
  const navigate = useNavigate();

  //toggling for password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => {
    setPasswordEye(!passwordEye)
  }
  
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const handleConfirmPasswordEye = () => {
    setConfirmPasswordEye(!confirmPasswordEye)
  }

  //loading state
  const [loadingState, setloadingState] = useState(false);

  //handles submit in react
  const onSubmit = async ({fullname, email, password}, actions)=>{
    
    setloadingState(true);

    //Submitting to the database 
    try {
      if(fullname && email && password){
        const {user} = await createUserWithEmailAndPassword(
          auth, email, password
        );
        await updateProfile(user, {displayName: `${fullname}`})
        //console.log(user)
        toast.success(successmsg);
        setloadingState(false);
        navigate('/');
      }
      
    } catch (error) {
      setloadingState(false);
      toast.error(errorMsg);
      //console.error(error.message)
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  }
  
  //de-structuring the property of useFormik()
  const {values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
       fullname: '',
       email: '',
       password: '',
       confirmPassword: "",
    },
    
    //validation
    validationSchema: basicSchema,
    onSubmit
  });

  //console.log(values);


  return (
    <>
    {loadingState && <Loader/>}
    <section className={`container pt-10 ${styles.auth}`}>
        
        <Card>
        <div className={styles.form}>
           <h2>Register</h2>
           
           <form autoComplete='off' onSubmit={handleSubmit}>

           <input
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            id='fullname' 
            type="text" 
            placeholder='Full name' 
            required
            className={errors.fullname && touched.fullname ? 'border-[#3a0303]' : ''}
            />
            {errors.fullname && touched.fullname && <p className='error text-red-500'>{errors.fullname}</p>}

            <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id='email' 
            type="email" 
            placeholder='email' 
            required
            className={errors.email && touched.email ? 'border-[#3a0303]' : ''}
            />
            {errors.email && touched.email && <p className='error text-red-500'>{errors.email}</p>}

            <div className='my-2 w-full relative'>
            <input 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id='password'
            type={(passwordEye === false) ? 'password' : 'text'}
            placeholder='password' 
            required
            className={errors.password && touched.password ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {errors.password && touched.password && <p className='error text-red-500'>{errors.password}</p>}
            
            <div className=' my-2 w-full relative'>
            <input 
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            id='confirmPassword' 
            type={(confirmPasswordEye === false) ? 'password' : 'text'} 
            placeholder='Confirm password' 
            required
            className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            />
            <div className='absolute right-2 top-6'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword && <p className='error text-red-500'>{errors.confirmPassword}</p>}
             
            <button type='submit' disabled={isSubmitting}  className='--btn --btn-primary --btn-block '>Register</button>
           </form>
            <span className={styles.register}>
                <p>Already have an account?</p> 
                <Link to='/login'> Login</Link>
            </span>

            <span className='m-5 text-center'> <p> By signing up you accept our <Link to='/terms-and-conditions' className='underline'> terms and conditions </Link> 
            <Link to='/privacy-policy' className='underline'> & privacy policy </Link> </p> </span>
        </div>
        </Card>
        <div className={styles.img}>
         <img src={RegisterImg} alt="RegisterImg" width='600'/>
        </div>
    </section>
    </>
  )
}

export default Register;


