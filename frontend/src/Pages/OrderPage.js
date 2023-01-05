import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Col, ListGroup, Row, Card, Button } from "react-bootstrap";
import MessageContainer from "../components/MessageContainer";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import OrderItemsPage from "./OrderItemsPage";
import {
  getSingleOrderDetailsAction,
  orderPaymentAction,
  orderDeliverAction
} from "../redux/actions/orderActions";
import { ORDER_PAY_RESET, ORDER_SET_TO_DELIVERY_BY_ADMIN_RESET } from "../redux/types/orderTypes";
import StripePayment from "./StripePayment";


const OrderPage = () => {
  const {id: orderId } = useParams();
  const navigate = useNavigate();

  //sdkReady piece state
  const [sdkReady, setSdkReady] = useState(false);

  //Destruc from state
  const user = useSelector(state => state.user)
  const { userInfo} = user;
  const orderDetails = useSelector(state => state.orderDetails)
  const { orderItems: order, loading, error } = orderDetails;
  // console.log("Order_Items are", orderItems, loading);
  const orderPayment = useSelector(state => state.orderPayment)
  const { loading: loadingPay, success: successPay } = orderPayment;
  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

 const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    //Create paypal script dynamically
    const addPayPalScript = async () => {
      //fetch secret peypal client id från backend 
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_SET_TO_DELIVERY_BY_ADMIN_RESET})
      dispatch(getSingleOrderDetailsAction(orderId));

    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    // eslint-disable-next-line
  }, [orderId, order, successPay, successDeliver, ]);

  //Success payment handler
  const successPaymentHandler = (paymentResult) => {
    console.log('PAYPAL PAYMENT:', paymentResult);
    dispatch(orderPaymentAction(orderId, paymentResult));
  };

  //markAsDelivered Handler
  const markAsDeliveredHandler = () => {
    dispatch(orderDeliverAction(order))
  }

  return loading ? (
    <Loader />
    ) : error ? (
      <MessageContainer variant='danger'>{error}</MessageContainer>
    ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        {/* 8 column col */}
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Frakt</h2>
              <p>
                <strong>Namn: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageContainer variant="success">
                  Levererad på {order.deliveredAt}
                </MessageContainer>
              ) : (
                <MessageContainer variant="danger">
                  Inte levererad
                </MessageContainer>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Betalsätt</h2>
              <p>
                <strong>Metod: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageContainer variant="success">
                  Betald På {order.paidAt}
                </MessageContainer>
              ) : (
                <MessageContainer variant="danger">
                  Inte Betald
                </MessageContainer>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Artiklar</h2>
              {order.orderItems.length === 0 ? (
                <MessageContainer>Order är tom</MessageContainer>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <OrderItemsPage
                        key={item.name}
                        item={item}
                        index={index}
                      />
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* 4 column Col */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>OrderÖversikt</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Artikel</Col>
                  SEK{" "}
                  {order.orderItems.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                  )}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Frakt</Col>
                  <p>SEK {order.shippingPrice}</p>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Totalt</Col>
                  <p>SEK {order.totalPrice}</p>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                  <>
                   <h6>For demo use following test credit card </h6><br />
                    <p>42424242424242424</p>
                    <p>01/21 : CVC 123</p>
                    <hr />
                      <StripePayment 
                      amount={order.totalPrice * 100}
                      orderId={orderId}
                      />
                    </>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button onClick={markAsDeliveredHandler}>
                  Märkera Levererad
                </Button>
              </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  
  );
};


export default OrderPage;
