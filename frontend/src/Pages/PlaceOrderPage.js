import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem, Row, Image, Button } from 'react-bootstrap'
import CheckoutProcessSteps from '../components/CheckoutProcessSteps'
import MessageContainer from '../components/MessageContainer'
import { createOrderAction } from '../redux/actions/orderActions'


const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Dest from  state
    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart
    console.log('PAYMENT', paymentMethod)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate



    useEffect(() => {
        if (success) {
          navigate(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [navigate, success])

    // redirect if address or card payment method is not select/filled
    if (!shippingAddress.address) {
        navigate('/shipping')
      } else if (!paymentMethod) {
        navigate('/payment')
    }

    //calc total items price
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    //calc total shipping price
    const shippingPrice = itemsPrice > 8000 ? 0 : 99 

    //calc total price including shipping price 
    const totalPrice = ( Number(itemsPrice) + Number(shippingPrice) ).toFixed(2)

    //placeOrderHandler
    const placeOrderHandler = () => {
        dispatch(createOrderAction({
            orderItems: cartItems,
            shippingAddress, 
            paymentMethod,
            shippingPrice, 
            totalPrice, 
            itemsPrice
        }))
        console.log('Order placed')
    }

    return (
        <>
            <CheckoutProcessSteps step1 step2 step3 step4 />
            {error && <MessageContainer>{error}</MessageContainer>}
            <Row>
                <Col md={8} >
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Frakt</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},{' '} {shippingAddress.postalCode},{' '}
                                {shippingAddress.city}{' '}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroupItem>
                            <h2>Betalsätt</h2><br />
                            <p>
                                <strong>Metod </strong>
                                {paymentMethod}{' '} 
                                
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2 className='my-2' >Kundvagn</h2>
                            {cartItems.length === 0 ? (
                                <MessageContainer>Kundvagnen är tom </MessageContainer>
                            ) : (
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md={2}><strong>Produkt</strong></Col>
                                            <Col md={2} >kvantitet</Col>
                                            <Col >Beskrivning</Col>
                                            <Col md={4}>Total</Col>
                                        </Row>
                                    </ListGroupItem>
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded /> 
                                            </Col>
                                            <Col md={2}>
                                                {item.qty}
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.id}`}>
                                                {item.name}
                                            </Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x SEK{item.price} = SEK{item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                        
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <ListGroupItem>
                        <h3>Orderöversikt</h3>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Artiklar:</Col>
                            <Col>SEK {itemsPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Frakt:</Col>
                            <Col>SEK {shippingPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Totalt:</Col>
                            <Col>SEK {totalPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button
                        type='button'
                        className='btn btn-block'
                        disabled={cartItems === 0}
                        onClick={placeOrderHandler}
                        >
                        Beställ
                        </Button>
                    </ListGroupItem>
                </Col>

            </Row>
        </>
    )
}


export default PlaceOrderPage;
