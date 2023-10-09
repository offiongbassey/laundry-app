import express from 'express';
import { adminLogout, createAdmin, loginAdmin } from '../controllers/adminController';
import { validationHandler } from '../helpers/validation';
import { create_admin_validator, login_admin_validator, logout_admin_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/create-account', validationHandler(create_admin_validator), createAdmin);
router.post('/login', validationHandler(login_admin_validator), loginAdmin);
router.get('/logout', validationHandler(logout_admin_validator), adminLogout);

module.exports = router;