import express from 'express';
import { createNewBusiness, createVendor, loginVendor, logoutVendor } from '../controllers/vendorController';
import { validationHandler } from '../helpers/validation';
import { create_business_validator, create_vendor_validator, login_vendor_validator, logout_vendor_validator } from '../middlewares/validator';
import { vendorAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/signup', validationHandler(create_vendor_validator), createVendor);
router.post('/login', validationHandler(login_vendor_validator), loginVendor);
router.get('/logout', validationHandler(logout_vendor_validator), logoutVendor);
router.post('/create-new-business', validationHandler(create_business_validator), vendorAuth, createNewBusiness);

module.exports = router;