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
                style={btnFacebook}
                render={renderProps => (
                  <button onClick={renderProps.onClick}>This is my custom FB button</button>
                )}
            />
    )
}
FacebookLoginPage.defaultProps = {
    FACEBOOK_ID: '411403226579858'
}


export default FacebookLoginPage
