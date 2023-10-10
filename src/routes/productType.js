import express from 'express';
import { adminAuth } from '../middlewares/auth';
import { activeProductTypes, adminGetAllProductTypes, changeProductTypeStatus, createProductType, deleteProductType, updateProductType } from '../controllers/productTypeController';
import { validationHandler } from '../helpers/validation';
import { change_product_type_status_validator, create_product_type_valiator, delete_product_type_validator, update_product_type_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/create', adminAuth, validationHandler(create_product_type_valiator), createProductType);
router.get('/admin-view-all', adminAuth, adminGetAllProductTypes);
router.get('/active', activeProductTypes);
router.patch('/update/:id', adminAuth, validationHandler(update_product_type_validator), updateProductType);
router.patch('/change-status/:id', adminAuth, validationHandler(change_product_type_status_validator), changeProductTypeStatus);
router.delete('/delete/:id', adminAuth, validationHandler(delete_product_type_validator), deleteProductType);

module.exports = router;