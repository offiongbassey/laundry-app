import express from 'express';
import adminRoute  from './admin';
const router = express.Router();

router.use('/admin', adminRoute);

module.exports = router;