import express from 'express';
import adminRoute  from './admin';
import productRoute from './product';
import productTypeRoute from './productType';
const router = express.Router();

router.use('/admin', adminRoute);
router.use('/product', productRoute);
router.use('/product-type', productTypeRoute);

module.exports = router;