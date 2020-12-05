import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, ListGroup, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getSingleOrderDetailsAction,
  orderPaymentAction,
  orderResetEfterPaymentAction,
} from "../redux/actions/orderActions";
import MessageContainer from "../components/MessageContainer";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import OrderItemsPage from "./OrderItemsPage";

const OrderPage = ({
  match,
  getSingleOrderDetailsAction,
  orderPaymentAction,
  orderResetEfterPaymentAction,
  orders,
  orderPayment,
}) => {
  const orderId = match.params.id;

  //sdkReady piece state
  const [sdkReady, setSdkReady] = useState(false);

  //Dest these from orderCreate state
  const { order, loading, error } = orders;
  console.log("Order_Items are", order, loading);
  const { loading: loadingPay, success: successPay } = orderPayment;
  console.log(loadingPay, successPay);

  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // }

    const addPayPalScript = async () => {
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

    if (!order || successPay || order._id !== orderId) {
      orderResetEfterPaymentAction();
      getSingleOrderDetailsAction(orderId);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [orderId, successPay, order]);

  //Success payment handler
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    orderPaymentAction(orderId, paymentResult);
  };

  if (!order || order.orderItems === null || loading) {
    return <Loader />;
  }

  return (
    <>
      {error && <MessageContainer variant="danger">{error}</MessageContainer>}
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
                  Betald på {order.paidAt}
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  getSingleOrderDetailsAction: (id) =>
    dispatch(getSingleOrderDetailsAction(id)),
  orderPaymentAction: (id) => dispatch(orderPaymentAction(id)),
  orderResetEfterPaymentAction: () => dispatch(orderResetEfterPaymentAction()),
});

//mapStateToProps
const mapStateToProps = ({ orders, orderPayment }) => ({
  orders: orders,
  orderPayment: orderPayment,
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
