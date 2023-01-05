import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


//@ fetch all products,  @req Type & route, GET, /api/products,  @access Public
const getAllProducts = asyncHandler( async (req, res) => {
  //for number ot items to show per page
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1
  console.log(page)
  const keyword = req.query.keyword ? {
    name: {
      $regex : req.query.keyword,
      $options : 'i'  //makes case insensetive
    }
  } : { }

  //get total count of products 
  const countTotalProducts = await Product.countDocuments({ ...keyword }) 
    const allProducts = await Product.find({ ...keyword}).limit(pageSize).skip(pageSize * (page - 1) )

    res.json({allProducts, page, totalPages: Math.ceil(countTotalProducts / pageSize) })
}) 

//@ fetch single product,  @req Type & route, GET, /api/products/:id,  @access    Public
const getSingleProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        } else {
            return res.status(404).json({ message: 'Produkt hittades inte'});
        }
}) 


  //@desc: Admin Creates product @req Type & route: POST, /api/products  @access: private for only admin
  const createProduct = asyncHandler(async (req, res) => {
   const newProduct = await new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
   })
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct)
  });


//@desc: Admin Delete product @req Type & route: DELETE, /api/product/:id  @access: private for only admin
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id);
  
    if(product) {
      await product.remove();
      res.json({message: 'Produkt raderad'})
    } else {
      return res.status(404).json({ message: 'Produkt hittades inte'});
    }
  });

  //@desc: Admin Update product @req Type & route: PUT, /api/product/:id  @access: private for only admin
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { name, price, image, brand, description, category, countInStock }  = req.body
    const product = await Product.findById(id);
  
    if(product) {
     product.name = name,
     product.price = price,
     product.image = image,
     product.brand = brand,
     product.description = description,
     product.category = category,
     product.countInStock = countInStock

     const updatedProduct = await product.save()
    res.json(updatedProduct)
    } else {
      return res.status(404).json({ message: 'Produkt hittades inte'});
    }
  });

  //Add product review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
      //check if user already reviewéd
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed'});
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    //get average of all rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    return res.status(201).json({ message: 'Recencionen lämnats' })
  } else {
    return res.status(404).json({ message: 'Produkt hittades inte'});
  }
})


//@ fetch top rated products,  @req Type & route, GET, /api/products/top,  @access Public
const getTopRatedProducts = asyncHandler( async (req, res) => {
  
const topProducts = await Product.find({}).sort({rating: -1}).limit(4)
    res.status(200).json(topProducts)
}) 


export { 
  getAllProducts, 
  getSingleProduct, 
  createProduct, 
  deleteProduct, 
  updateProduct, 
  createProductReview, 
  getTopRatedProducts   
}