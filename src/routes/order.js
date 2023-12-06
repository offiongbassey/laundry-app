import express from 'express';
import { userAuth } from '../middlewares/auth';
import { createOrder, deleteOrder, deleteOrderItem, userOrderById, userOrders } from '../controllers/orderController';
import { validationHandler } from '../helpers/validation';
import { create_order_validator, user_delete_order_item_validator, user_delete_order_validator, user_order_by_id_validator } from '../middlewares/validator';

const router = express.Router();
//user routes
router.post('/create-order', validationHandler(create_order_validator), userAuth, createOrder);
router.get('/user-orders', userAuth, userOrders);
router.get('/user-order-by-id/:order_id', user_order_by_id_validator, userAuth, userOrderById);
router.patch('/user-delete-order-item/:order_item_id/:order_id', validationHandler(user_delete_order_item_validator), userAuth, deleteOrderItem);
router.patch('/user-delete-order/:order_id', validationHandler(user_delete_order_validator), userAuth, deleteOrder);
module.exports = router;