import React, { useEffect } from 'react';
import { useDispatch, connect} from 'react-redux'
import axios from 'axios';
// import  M from 'materialize-css/dist/js/materialize.min.js'
import StripeCheckout from 'react-stripe-checkout';
import { orderPaymentAction } from '../redux/actions/orderActions';


const StripePayment = ({amount, orderId, user, orderPayment, history}) => {
    // const totalPriceForStripe = amount * 100;
    const publisheableKey =  'pk_test_RzGqGLi6SMcG89NC0XhEfglg001P2xHdMu'

    const { userInfo} = user;
    const { success: successPay } = orderPayment;
    const dispatch = useDispatch();

    //token passes into backend req, token contains all info about payment
    const onToken = async (token) => {
        console.log(token);
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
            history.push('/')
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
                description={`Total amount to pay is $${amount}` }
                amount={amount}
                panelLabel='Betala Med Stripe'
                token={onToken}
                stripeKey={publisheableKey}
                className='btn btn-block py-1 ' 
            />
        </div>
    );
}
//mapStateToProps
const mapStateToProps = ({ user, orderPayment,  }) => ({
    user: user,
    orderPayment: orderPayment,
  
  });
  export default connect(mapStateToProps, null)(StripePayment);
  
