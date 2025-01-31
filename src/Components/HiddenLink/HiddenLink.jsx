import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../Redux/Slice/AuthSlice';


// FUNC... TO SHOW IF USERS IS LOGIN
const ShowOnLogIn = ({children}) => {

    const isLogIn = useSelector(selectIsLoggedIn);

    if(isLogIn){
      return  children
    };

    return null;
}

export default ShowOnLogIn;

// FUNC... TO SHOW IF USERS IS LOGOUT
export const ShowOnLogOut = ({children}) => {

    const isLogIn = useSelector(selectIsLoggedIn);

    if(!isLogIn){
      return  children
    };

    return null;
};

