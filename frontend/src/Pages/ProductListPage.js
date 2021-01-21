import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getProductsList, deleteProduct , createProduct} from '../redux/actions/productActions'
import MessageContainer from "../components/MessageContainer";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";


const ProductListPage = ({ match, history,  productList, user, productDelete, productCreate}) => {

  //Get pageNumber query string from url
  const pageNumber = match.params.pageNumber || 1
  //Destructure
  const { loading, error, products, page, totalPages  } = productList
  const { userInfo } = user;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
    success: successCreate,
  } = productCreate

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } 
    
    if(successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      //getProductsList Action takes in two parameters
      dispatch(getProductsList('', pageNumber))
    }
    // eslint-disable-next-line 
  }, [ dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Är du säkert')) {
      dispatch(deleteProduct(id))
    }
  };

  //create product
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
       <Row className='align-items-center'>
        <Col>
          <h2>ProduktsLista</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Skapa Produkt
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <MessageContainer variant='danger'>{errorDelete}</MessageContainer>}   
      {loadingCreate && <Loader />}
      {errorCreate && <MessageContainer variant='danger'>{errorCreate}</MessageContainer>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageContainer variant="danger">{error}</MessageContainer>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
              <th>ID</th>
                  <th>NAMN</th>
                  <th>PRIS</th>
                  <th>KATEGORI</th>
                  <th>BRAND</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                  
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate  page={page} totalPages={totalPages} isAdmin={true} />
        </>
      )}
    </>
  );
};

  //mapStateToProps
const mapStateToProps = ({ productList, user, productDelete, productCreate }) => ({
    productList: productList,
    user: user,
    productDelete: productDelete,
    productCreate: productCreate,
  });
  
export default connect(mapStateToProps, null) (ProductListPage)