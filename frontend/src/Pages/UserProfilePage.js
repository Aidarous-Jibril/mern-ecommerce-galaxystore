import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader.js";
import MessageContainer from "../components/MessageContainer";
import {
  getUserProfileDetails,
  updateUserProfileDetails,
} from "../redux/actions/userActions";
import { myOrdersListAction } from "../redux/actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/types/userTypes.js";

const UserProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  const { userInfo } = user;

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, userProfileDetails } = userDetails;

  const userProfileUpdate = useSelector(state => state.userProfileUpdate)
  const { success } = userProfileUpdate;

  const myOrderList = useSelector(state => state.myOrderList)
  const { loading: loadingMyOrders, error: errorMyOrders, myOrders } = myOrderList;




  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userProfileDetails || !userProfileDetails.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserProfileDetails("profile"));
        dispatch(myOrdersListAction());
      } else {
        setName(userProfileDetails.name);
        setEmail(userProfileDetails.email);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, history, userInfo, success, userProfileDetails, getUserProfileDetails, myOrdersListAction ]);

  //submit
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      //Dispatch updateUserProfileDetails
      dispatch(updateUserProfileDetails({
        id: userProfileDetails._id,
        name,
        email,
        password,
      }));
    }
    //reset form fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Row>
      <Col xs={12} md={3}>
        <h1>Din Profil</h1>
        { message && <MessageContainer variant="danger">{message}</MessageContainer> }
        { success && <MessageContainer variant='success'>Profile Updated</MessageContainer>}

        {loading ? (
          <Loader />
        ) : error ? (
          <MessageContainer variant='danger'>{error}</MessageContainer>
        ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name address</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>  
        )}   
      </Col>

      <Col responsive="sm" md={9}>
        <h1>Dina ordrar</h1>
        {loadingMyOrders ? (
          <Loader />
        ) : errorMyOrders ? (
          <MessageContainer variant="danger">{errorMyOrders}</MessageContainer>
        ) :  myOrders.length === 0 ? (
          <MessageContainer variant="info">Du har inga ordrar</MessageContainer>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order_ID</th>
                <th>DATUM</th>
                <th>TOTALT</th>
                <th>BETALD</th>
                <th>LEVERERAD</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders &&
                myOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};




export default UserProfilePage;
