import express from 'express';
import { createAdmin } from '../controllers/adminController';
import { validationHandler } from '../helpers/validation';
import { create_admin_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/create-account', validationHandler(create_admin_validator), createAdmin);

module.exports = router;