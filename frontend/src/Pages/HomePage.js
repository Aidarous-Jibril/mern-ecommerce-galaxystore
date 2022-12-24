import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from  'react-redux';
import { getProductsList } from '../redux/actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductsCarousel from '../components/ProductsCarousel';
import MessageContainer from '../components/MessageContainer';
import ReactHelmet from '../components/ReactHelmet';

 

const HomePage = ({ match }) => {

    //get searched keyword from url and pass it (if s/thing init) to the getProductsList action which gets products
    const keyword = match.params.keyword
    //get searched pageNumber from url and pass it (if s/thing init) to the getProductsList action which gets products
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, totalPages } = productList
    
    useEffect(() => {
        dispatch(getProductsList(keyword, pageNumber));
    //eslint-disable-next-line
    }, [dispatch, keyword, pageNumber])

    if (loading || products === null) {
        return  <Loader />;
      }
   
    return (
        <>
        <ReactHelmet />
        {!keyword ? <ProductsCarousel /> : <Link to='/' className='btn btn-primary my-3' >Tillbaka</Link>}
            <h1>Top Produkter!</h1>
            {loading && <Loader />}
            {error && <MessageContainer variant='danger'>{error}</MessageContainer>}
                <Col>
                <>
                    <Row>
                        {products && products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={3} >                        
                                <Product key={product._id} id={product._id} product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-3">
                     <Paginate  page={page} totalPages={totalPages} keyword={keyword ? keyword : ''} />
                    </Row>
                </>    
                </Col>
            
        </>
    )
}

 
export default HomePage;
