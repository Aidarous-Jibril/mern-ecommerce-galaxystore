import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product'
import { connect } from  'react-redux';
import { getProductsList } from '../redux/actions/productActions'
import Loader from '../components/Loader';
import MessageContainer from '../components/MessageContainer';

const HomePage = ({ getProductsList, productList  }) => {
    const { loading, error, products } = productList
// console.log(products)
    useEffect(() => {
        getProductsList();
    //eslint-disable-next-line
    }, [])
    if (loading || products === null) {
        return  <Loader />;
      }
    return (
        <>
            <h1>Top Produkter!</h1>
            {loading && <Loader />}
            {error && <MessageContainer variant='danger'>{error}</MessageContainer>}
                <Col>
                    <Row>
                        {products && products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={3} >                        
                                <Product key={product._id} id={product._id} product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            
        </>
    )
}

//send action direct from comp in useEffect
const mapDispatchToProps = dispatch => ({
    getProductsList : () => dispatch(getProductsList()) 
  })

  //mapStateToProps
const mapStateToProps = ({ productList }) => ({
    productList: productList
  });
  
 
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
