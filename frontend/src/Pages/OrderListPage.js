import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { getAllOrdersAction } from '../redux/actions/orderActions'
import MessageContainer from "../components/MessageContainer";
import Loader from "../components/Loader";


const OrderListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //Destructure from state
  const user = useSelector(state => state.user)
  const { userInfo } = user;
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList
  console.log(orders)


  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate('/login')
    } else {
        dispatch(getAllOrdersAction())
    } 
    // eslint-disable-next-line 
  }, [ navigate, userInfo ]);


  return (
    <>
    <h1>Order List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageContainer variant="danger">{error}</MessageContainer>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
                <th>ID</th>
                <th>KUND</th>
                <th>DATUM</th>
                <th>BETALD</th>
                <th>TOTAL</th>
                <th>LEVERERAD</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>{order.createdAt}</td>
                  <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                 </td>
                  <td>{order.totalPrice} SEK</td>
                  <td>
                  {order.deliveredAt ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
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
    </>
  );
};


export default OrderListPage;