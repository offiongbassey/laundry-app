import express from 'express';
import { createProduct, AdminGetAllProducts, updateProduct, deleteProduct, activeProducts, changeProductStatus } from '../controllers/productController';
import { validationHandler } from '../helpers/validation';
import { change_product_status_validator, create_product_validator, delete_product_validator, update_product_validator } from '../middlewares/validator';
import { adminAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/create', adminAuth, validationHandler(create_product_validator), createProduct);
router.get('/admin-all', adminAuth, AdminGetAllProducts);
router.patch('/update/:id', adminAuth, validationHandler(update_product_validator), updateProduct);
router.delete('/delete/:id', adminAuth, validationHandler(delete_product_validator), deleteProduct);
router.get('/active', activeProducts);
router.patch('/change-status/:id', adminAuth, validationHandler(change_product_status_validator), changeProductStatus);

module.exports = router;