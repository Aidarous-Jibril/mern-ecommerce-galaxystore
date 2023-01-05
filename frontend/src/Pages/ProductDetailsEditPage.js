import React, { useState, useEffect } from "react";
import axios from 'axios'
import {Button,Form,} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct, updateProduct } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import FormContainer from './FormContainer.js'
import MessageContainer from '../components/MessageContainer'
import { PRODUCT_UPDATE_BY_ADMIN_RESET } from "../redux/types/productTypes";

const ProductDetailsEditPage = () => {

  let { productId } = useParams();
  let navigate = useNavigate();

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch();

  const user = useSelector(state => state.user)
  const { userInfo} = user;
  const singleProductDetails = useSelector(state => state.singleProductDetails)
  const { loading, error, product } = singleProductDetails;
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
 
  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin && successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_BY_ADMIN_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(getSingleProduct(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, userInfo, productId, product, successUpdate])

//image upload handler
const  uploadFileHandler = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  //must name 'image' here to match attached 'image' to req in backend
  formData.append('image', file)
  setUploading(true)

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', formData, config)

    setImage(data)
    setUploading(false)
  } catch (error) {
    console.error(error)
    setUploading(false)
  }
}

//submit updated product
const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ 
        _id: productId, 
        name,price, 
        image, brand, 
        category, 
        countInStock, 
        description  
    }))
  }

     return (
     <>
     <Link to='/' className='btn btn-light my-3'>
        Gå Bak
      </Link>
     <h1>Redigera Produkt</h1>
     {loadingUpdate && <Loader />}
     {errorUpdate && <MessageContainer variant='danger'>{errorUpdate}</MessageContainer>}

     <FormContainer>
     {loading ? (
          <Loader />
        ) : error ? (
          <MessageContainer variant='danger'>{error}</MessageContainer>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Pris</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter pris'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Bild</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter bild url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter kategori'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Beskrivning</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter beskrivning'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Lager Status</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter lagerstatus'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

          
            <Button type='submit' variant='primary'>
              Updatera
            </Button>
          </Form>
        )}
      </FormContainer>

     </>

   )
 }


export default ProductDetailsEditPage;

