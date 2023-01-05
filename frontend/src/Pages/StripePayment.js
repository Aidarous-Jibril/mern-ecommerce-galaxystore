import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { orderPaymentAction } from '../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';


const StripePayment = ({ amount, orderId, }) => {
    const publisheableKey =  'pk_test_RzGqGLi6SMcG89NC0XhEfglg001P2xHdMu'
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const user = useSelector(state => state.user)
    const { userInfo} = user;
    const orderPayment = useSelector(state => state.orderPayment)
    const { success: successPay } = orderPayment;

    //token passes into backend req, token contains all info about payment
    const onToken = async (token) => {
        console.log('Stripe Token is:', token);
        const config = {token, amount, orderId}
        try {
            const { data } = await axios.post('/stripe', config); 
            if(data.success){
                //reuse orderPaymentAction
                await dispatch(orderPaymentAction(orderId ))
            }
            alert('succesful payment')

        } catch (error) {
            console.log('Payment Error:', error);
            alert( 'payment err! Please make sure you use the provided credit card.')    
        }
    }
    useEffect(() => {
        if(!userInfo){
            navigate.push('/')
        }     
        // eslint-disable-next-line
    }, [successPay])

    return (
        <div className=''>
            <StripeCheckout 
                label='Betala Med Stripe'
                name= 'Galaxy Store Ltd'
                billingAddress
                shippingAddress
                image='https://svgshare.com/i/CUz.svg'
                description={`Total Belop att betala SEK ${amount}` }
                amount={amount}
                panelLabel='Betala Med Stripe'
                token={onToken}
                stripeKey={publisheableKey}
                className='btn btn-block py-1 ' 
            />
        </div>
    );
}

  export default StripePayment;
  
