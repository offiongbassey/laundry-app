import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/userController';
import { validationHandler } from '../helpers/validation';
import { user_login_validator, user_logout_validator, user_signup_validator } from '../middlewares/validator';

const router = express.Router();

router.post('/signup', validationHandler(user_signup_validator), createUser);
router.post('/login', validationHandler(user_login_validator), loginUser);
router.get('/logout', validationHandler(user_logout_validator), logoutUser);
module.exports = router;
