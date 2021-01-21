import express from 'express'
const router = express.Router();
import { 
  getAllProducts, 
  getSingleProduct, 
  createProduct, 
  deleteProduct, 
  updateProduct, 
  createProductReview,
  getTopRatedProducts 
} from '../controllers/productController.js'
import {
    requireAuth,
    requireAdminAccess,
  } from "../middlewares/authMiddleware.js";

router.get('/', getAllProducts )
router.get('/top', getTopRatedProducts )
router.post('/', requireAuth, requireAdminAccess, createProduct)
router.post('/:id/reviews', requireAuth, createProductReview)
router.get('/:id', getSingleProduct);
router.delete('/:id', requireAuth, requireAdminAccess, deleteProduct);
router.put('/:id', requireAuth, requireAdminAccess, updateProduct);

export default router;