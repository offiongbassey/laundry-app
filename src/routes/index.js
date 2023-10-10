import express from 'express';
import adminRoute  from './admin';
import productRoute from './product';
const router = express.Router();

router.use('/admin', adminRoute);
router.use('/product', productRoute);

module.exports = router;