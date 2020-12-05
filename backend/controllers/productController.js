import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


//@ fetch all products,  @req Type & route, GET, /api/products,  @access Public
const getAllProducts = asyncHandler( async (req, res) => {
    const allProducts = await Product.find({})

    res.json(allProducts)
}) 

//@ fetch single product,  @req Type & route, GET, /api/products/:id,  @access    Public
const getSingleProduct = asyncHandler( async (req, res) => {
    const singleProduct = await Product.findById(req.params.id)
        if(singleProduct){
            res.json(singleProduct)
        } else {
            res.status(404).json({message: 'Product not found'})
        }
}) 

export { getAllProducts, getSingleProduct }