import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import {  Carousel, Image } from 'react-bootstrap'
import Loader from './Loader';
import MessageContainer from './MessageContainer';
import { Link } from 'react-router-dom';
import { getTopRatedProducts } from '../redux/actions/productActions';

const ProductsCarousel = ({ productsTopRated }) => {
    //destructure
    const {loading, error, topProducts } = productsTopRated
    const dispatch = useDispatch();
    
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
                        <p>({product.price} SEK)</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            ))}
        </Carousel>        
    )
    
}
const mapStateToProps = ({ productsTopRated }) => ({
    productsTopRated: productsTopRated
})

export default connect(mapStateToProps, null)(ProductsCarousel)
