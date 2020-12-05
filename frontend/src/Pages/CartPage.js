import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Form,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeItemFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

const CartPage = ({
  history,
  match,
  location,
  addToCart,
  removeItemFromCart,
  cart,
}) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    addToCart(productId, qty);
    //eslint-disable-next-line
  }, [productId, qty]);

  //Remove cart handler
  const removeCartHandler = (id) => {
    removeItemFromCart(id);
  };
  //Check out handler
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h4>
            Your Cart is empty{" "}
            <Link
              to="/"
              variant="primary"
              className="btn btn my-3 text-dark bold"
            >
              Go Back
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
                        addToCart(item.id, Number(e.target.value))
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

// //mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
  removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
});
//mapStateToProps
const mapStateToProps = ({ cart }) => ({
  cart: cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
