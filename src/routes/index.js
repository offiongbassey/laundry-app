import express from 'express';
import adminRoute  from './admin';
import productRoute from './product';
import productTypeRoute from './productType';
import vendorRoute from './vendor';
const router = express.Router();

router.use('/admin', adminRoute);
router.use('/product', productRoute);
router.use('/product-type', productTypeRoute);
router.use('/vendor', vendorRoute);

module.exports = router;