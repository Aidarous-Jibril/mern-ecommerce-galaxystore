import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from './FormContainer'
import CheckoutProcessSteps from '../components/CheckoutProcessSteps'
import { savePaymentMethod } from '../redux/actions/cartActions.js'

const PaymentPage = ({ history, shippingAddress, savePaymentMethod }) => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    // const [paymentMethod, setPaymentMethod] = useState('Paypal')

    useEffect(() => {
       if(!shippingAddress){
        history.push('/shipping')
       }
       // eslint-disable-next-line
    }, [shippingAddress])

//Submit
const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod)
    history.push('/placeorder')
}
    return (
        <FormContainer>
            <CheckoutProcessSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <h1>Betalningsmetod</h1>
                <Form.Group controlId="paymentMethod">
                    <Col>
                        <Form.Check type="radio" id="Paypal" 
                            label="Paypal eller Kredit kort" 
                            value='Paypal' checked
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
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

const mapStateToDispatch = (dispatch) => ({
    savePaymentMethod: (data) => dispatch(savePaymentMethod(data))
})

const mapStateToProps = ({ cart: { shippingAddress }}) => ({
    shippingAddress: shippingAddress
})

export default connect(mapStateToProps, mapStateToDispatch)(PaymentPage)
