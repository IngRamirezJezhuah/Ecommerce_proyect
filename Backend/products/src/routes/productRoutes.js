import express from "express";
import { saludar, deleteProduct, getProduct, createProduct, updateProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.get('/test', saludar);
router.get('/', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

