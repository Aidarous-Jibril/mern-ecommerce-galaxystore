import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { connect } from "react-redux";
import { getSingleProduct } from "../redux/actions/productActions";
import Loader from "../components/Loader";

const ProductDetailsPage = ({
  history,
  match,
  getSingleProduct,
  singleProductDetails,
}) => {
  const [qty, setQty] = useState(1);

  const { loading, product } = singleProductDetails;
  const id = match.params.id;
  useEffect(() => {
    getSingleProduct(id);
    //eslint-disable-next-line
  }, [match]);

  //Add To Cart Handler
  const addToCartHandler = () => {
    history.push(`/cart/${id}/qty?=${qty}`);
  };

  if (loading || product === null) {
    return <Loader />;
  }
  return (
    <>
      <Link to="/" className="btn btn my-3 text-dark">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>{product.name}</h4>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                textRating={`${product.numReviews} reviews`}
              />
            </ListGroupItem>

            <ListGroupItem>
              <strong>Price: </strong>
              {product.price} SEK{" "}
            </ListGroupItem>
            <ListGroupItem> {product.description} </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>
                    {" "}
                    Price: <strong>{product.price} SEK</strong>{" "}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    {" "}
                    <strong>Status:</strong>{" "}
                    {product.countInStock > 0
                      ? `${product.countInStock} in stock`
                      : "out Of stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((k) => (
                          <option key={k + 1} value={k + 1}>
                            {k + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem className="my-4">
                <Button
                  className="btn btn-block"
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
});
//mapStateToProps
const mapStateToProps = ({ singleProductDetails }) => ({
  singleProductDetails: singleProductDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
