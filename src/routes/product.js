import express from 'express';
import { createProduct } from '../controllers/productController';
import { validationHandler } from '../helpers/validation';
import { create_product_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/create', validationHandler(create_product_validator), createProduct);

module.exports = router;