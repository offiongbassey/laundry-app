import express from 'express';
import { createVendor, loginVendor, logoutVendor } from '../controllers/vendorController';
import { validationHandler } from '../helpers/validation';
import { create_vendor_validator, login_vendor_validator, logout_vendor_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/signup', validationHandler(create_vendor_validator), createVendor);
router.post('/login', validationHandler(login_vendor_validator), loginVendor);
router.get('/logout', validationHandler(logout_vendor_validator), logoutVendor);

module.exports = router;