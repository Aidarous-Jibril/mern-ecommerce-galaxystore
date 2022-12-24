import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row, Col, Card, ListGroup, Image, Form, Button, ListGroupItem } from "react-bootstrap";
import { addToCart, removeItemFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

const CartPage = ({ history, match, location }) => {
  const productId = match.params.id;
  //get qty search query in the url by splitting
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  //Destructure cart from state
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
  // console.log(cartItems);

  const dispatch = useDispatch()

  useEffect(() => {
    //fire addToCart action and add product & qty to cart as as useEffect fired in this component
    if(productId) {
      dispatch(addToCart(productId, qty));
    } 
    //eslint-disable-next-line
  }, [dispatch, productId, qty]);

  //Remove cart handler
  const removeCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  //Check out handler
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Köpping Cart</h1>
        {cartItems.length === 0 ? (
          <h4>
            Din kundvagn är tomt{" "}
            <Link
              to="/"
              variant="primary"
              className="btn btn my-3 text-dark bold"
            >
              Tillbaka
            </Link>
          </h4>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroupItem key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {" "}
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price} SEK</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeCartHandler(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroupItem>
              <Card.Header as="h4" className="my-2">
                ({cartItems.reduce((tot, item) => tot + item.qty, 0)}) varor
              </Card.Header>
              Att betala:{" "}
              {cartItems
                .reduce((tot, item) => tot + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              SEK
            </ListGroupItem>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Till Kassan
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};


export default CartPage;
