import React from 'react'
import {  useDispatch } from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import { userLoginWithFaceBook } from '../redux/actions/userActions';

const FacebookLoginPage = ({ FACEBOOK_ID, btnFacebook }) => {
    const dispatch =  useDispatch();

    const responseFacebook = async (response) => {
        console.log(response)
        dispatch(userLoginWithFaceBook(response))
      }

    return (
      
        <FacebookLogin
            appId={FACEBOOK_ID}
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fab fa-facebook-square fa-2x"
              />

    )
}
FacebookLoginPage.defaultProps = {
    FACEBOOK_ID: '411403226579858'
}


export default FacebookLoginPage
