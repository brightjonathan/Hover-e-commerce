import { useSelector } from 'react-redux';
import { selectemail } from '../../Redux/Slice/AuthSlice';
//import { Link } from 'react-router-dom';
import PageNotFound from '../../Pages/PageNotFound/Page404';


//This func.. shows when the user is not an admin
const AdminRoute = ({children}) => {
  const userEmail = useSelector(selectemail);

  if( userEmail === 'brightjonathan64@gmail.com'){
    return children;
  }

  return (
    // <section style={{height: '80vh'}}>
    //   <div className="container">
    //     <h2>Permission denied</h2>
    //     <p>This page can only be view by an admin user</p>
    //     <br/>
    //     <Link to='/'> <button className='--btn'>&larr; Back to Home page</button> </Link>
    //   </div>
    // </section>

    //ADDING THE PAGENOTFOUND FILE 
    <>
    <PageNotFound />
    </>
  );
 
}

//This func... shows the ADMIN nav in your Header component...
export const AdminRouteLink = ({children}) => {
  const userEmail = useSelector(selectemail);

  if( userEmail === 'brightjonathan64@gmail.com'){
    return children;
  }

  return null;
 
}

export default AdminRoute;


