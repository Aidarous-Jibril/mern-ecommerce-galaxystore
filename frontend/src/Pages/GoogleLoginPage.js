import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import { userLoginWithGoogle } from '../redux/actions/userActions';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const GoogleLoginPage = () => {

    const dispatch =  useDispatch();


    const clientId="467512918612-mnlop54n512qt070c47aqircim7pm1e0.apps.googleusercontent.com"

    useEffect(() => {
       const initClient = () => {
             gapi.client.init({
             clientId: clientId,
             scope: ''
           });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const onSuccess = (res) => {
      console.log('success:', res);
      dispatch(userLoginWithGoogle(res))
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };

    return (
        <GoogleLogin
          clientId={clientId}
          buttonText="Logga in med Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
    )
}

export default GoogleLoginPage;
