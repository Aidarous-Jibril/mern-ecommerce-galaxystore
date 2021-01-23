import React from 'react'
import {  useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { userLoginWithGoogle } from '../redux/actions/userActions';


const GoogleLoginPage = () => {

    const dispatch =  useDispatch();

    const responseGoogle = async (response) => {
        dispatch(userLoginWithGoogle(response))
      }

    return (
            <GoogleLogin
                clientId="467512918612-mnlop54n512qt070c47aqircim7pm1e0.apps.googleusercontent.com"
                buttonText="Logga in Med Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                
            />
      
    )
}

export default GoogleLoginPage;
