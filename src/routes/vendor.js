import express from 'express';
import { createVendor } from '../controllers/vendorController';
import { validationHandler } from '../helpers/validation';
import { create_vendor_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/signup', validationHandler(create_vendor_validator), createVendor);

module.exports = router;