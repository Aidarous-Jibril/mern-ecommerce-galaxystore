import express from 'express'
const router = express.Router();
import { getAllProducts, getSingleProduct } from '../controllers/productController.js'


router.get('/', getAllProducts )
router.get('/:id', getSingleProduct);

export default router;