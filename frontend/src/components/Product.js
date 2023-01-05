import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating';
import { useParams } from 'react-router-dom';

const Product = ({ product }) => {

    const { keyword } = useParams();
    // console.log(keyword)
    let { pageNumber } = useParams();
    // console.log(pageNumber)
    pageNumber = pageNumber|| 1;

    return (
        <Card className='my-3 p-3 rounded' >
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
          
          <Card.Body>
              <Link to={`/product/${product._id}`}>
                <Card.Title  as='div'><strong>{product.name}</strong></Card.Title>
              </Link>

            <Rating value={product.rating} textRating={`${product.numReviews} reviews`} />
            <Card.Text as='h3'> {product.price} <span style={{ fontSize: '22px'}}>:-</span></Card.Text>              
          </Card.Body>

          <Link to={`/product/${product._id}`} >
            <Button className="btn btn-block " type="button" size="m" block to={`product/${product._id}`} >
                  LÄS MER
            </Button>
          </Link>
        
        </Card>
    )
}

export default Product
