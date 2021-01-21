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
import { connect, useDispatch } from "react-redux";
import { getSingleProduct, createProductReview } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import MessageContainer from "../components/MessageContainer";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/types/productTypes";
import ReactHelmet from '../components/ReactHelmet'

const ProductDetailsPage = ({
  history,
  match,
  singleProductDetails,
  user,
  productReviewCreate
}) => {
  const [qty, setQty] = useState(1);
  // Review state
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')

  const id = match.params.id;
  const dispatch = useDispatch()  

//Destruc frm state 
  const { loading, error, product } = singleProductDetails;
  // console.log(product.reviews)
  const { userInfo } = user;
  const { 
    loading: loadingProductReview, 
    error: errorProductReview, 
    success: successProductReview} = productReviewCreate;

  useEffect(() => {
    //reset rating, comment state after submitting
    if(successProductReview){
      alert('Recensionen är lämnad')
      setRating(0)
      setComment('')
    }
    if(id){
      dispatch(getSingleProduct(id));
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    //eslint-disable-next-line
  }, [match, successProductReview]);

  //Add To Cart Handler
  const addToCartHandler = () => {
    history.push(`/cart/${id}/qty?=${qty}`);
  };

  //Submit handler for review object
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, {rating, comment}))
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Tillbaka
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageContainer variant='danger'>{error}</MessageContainer>
      ) : (
        <>
          <ReactHelmet title={product.name} />
          <Row>
            {/* 3 Columns in this Row, 6, 3 & 3 */}
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
                    textRating={`${product.numReviews} recensioner`}
                  />
                </ListGroupItem>

                <ListGroupItem>
                  <strong>Pris: </strong>
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
                        Pris: <strong>{product.price} SEK</strong>{" "}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        {" "}
                        <strong>LagerStatus:</strong>{" "}
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
                      Lägg till Kundvagn
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          
          <Row>
            {/* Review Row contains column with md 6 (show all reviews and create review form/ starts here */}
            <Col md={6}>
              <h2>Recensioner</h2>
                {product.reviews && product.reviews.length === 0 && <MessageContainer>Inga Recensioner</MessageContainer>}
                <ListGroup variant='flush'>
                  {product.reviews && product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Skriv en kundrecension</h2>
                    {successProductReview && (
                      <MessageContainer variant='success'>
                      Recensionen har skickats
                      </MessageContainer>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <MessageContainer variant='danger'>{errorProductReview}</MessageContainer>
                    )}
                    {/* Review form starts here */}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Dålig</option>
                            <option value='2'>2 - Rimlig</option>
                            <option value='3'>3 - Bra</option>
                            <option value='4'>4 - Mycket bra</option>
                            <option value='5'>5 - Utmärkt</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                        >
                          Skicka
                        </Button>
                      </Form>
                    ) : (
                      <MessageContainer>
                        Vänligen <Link to='/login'>logga in</Link> för att skriv en recension{' '}
                      </MessageContainer>
                    )}
                  </ListGroup.Item>
                </ListGroup>
            </Col>
          </Row>
          {/* End of Review here */}

        </>
      ) }
      
    </>
  );
};

//mapStateToProps
const mapStateToProps = ({ singleProductDetails, user, productReviewCreate }) => ({
  singleProductDetails: singleProductDetails,
  user: user,
  productReviewCreate: productReviewCreate,
  
});

export default connect(mapStateToProps, null)(ProductDetailsPage);

