import { useSelector } from 'react-redux';
import { selectemail } from '../../Redux/Slice/AuthSlice';
import PageNotFound from '../../Pages/PageNotFound/Page404';


//This func.. shows when the user is not an admin
const AdminRoute = ({children}) => {
  const userEmail = useSelector(selectemail);

  if( userEmail === 'brightjonathan64@gmail.com'){
    return children;
  }

  return (
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


