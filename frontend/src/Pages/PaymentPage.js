import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import CheckoutProcessSteps from '../components/CheckoutProcessSteps'
import { savePaymentMethod } from '../redux/actions/cartActions.js'


const PaymentPage = () => {
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch();

    //Destruc from state
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
       if(!shippingAddress){
        navigate.push('/shipping')
       }
       // eslint-disable-next-line
    }, [shippingAddress])

    console.log(paymentMethod)
//Submit
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
}
    return (
        <FormContainer>
            <CheckoutProcessSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <h1>Betalningsmetod</h1>
                <Form.Group controlId="paymentMethod">
                    <Col>
                         <Form.Check 
                            type="radio" 
                            label="Paypal eller Kredit kort" 
                            id="Paypal" 
                            name='paymentMethod'
                            value='Paypal' 
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        >
                        </Form.Check> 
                       
                         <Form.Check
                            type='radio'
                            label='stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> 
                      
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Till Kassan
                </Button>
            </Form>
        </FormContainer>
    )
}


export default PaymentPage;
