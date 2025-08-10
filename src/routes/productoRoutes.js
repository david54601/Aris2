import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createProduct, getMyProducts, getProductById, updateProduct, deleteProduct } from '../controllers/ProductoController.js';

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/', verifyToken, getMyProducts);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
