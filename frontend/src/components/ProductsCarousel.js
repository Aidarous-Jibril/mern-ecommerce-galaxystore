import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  Carousel, Image } from 'react-bootstrap'
import Loader from './Loader';
import MessageContainer from './MessageContainer';
import { Link } from 'react-router-dom';
import { getTopRatedProducts } from '../redux/actions/productActions';

const ProductsCarousel = () => {

    const dispatch = useDispatch();
    //destructure
    const productsTopRated = useSelector(state => state.productsTopRated)
    const {loading, error, topProducts } = productsTopRated
    
    useEffect(() => {
        dispatch(getTopRatedProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <MessageContainer>{error}</MessageContainer> : (
        <Carousel pause='hover' className='bg-dark'>
            {topProducts.map((product) => (
            <Carousel.Item key={product._id} className='carousel-item'>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid  />
                    <Carousel.Caption className='carousel-caption'>
                        <h2> {product.name} </h2>  
                        <p>{product.price} <span style={{ fontSize: '22px'}}>:-</span></p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            ))}
        </Carousel>        
    )
    
}


export default ProductsCarousel;
