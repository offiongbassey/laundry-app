import express from 'express';
import adminRoute  from './admin';
import productRoute from './product';
import productTypeRoute from './productType';
import vendorRoute from './vendor';
import serviceRoute from './service';
import userRoute from './user';

const router = express.Router();

router.use('/admin', adminRoute);
router.use('/product', productRoute);
router.use('/product-type', productTypeRoute);
router.use('/vendor', vendorRoute);
router.use('/service', serviceRoute);
router.use('/user', userRoute);

module.exports = router;