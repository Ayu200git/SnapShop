const express = require('express');
const router = express.Router();

const ordersController = require('../../controllers/orders');
const isAuth = require('../../middleware/is-auth');

router.post('/checkout', isAuth, ordersController.createCheckoutSession);

router.post('/', isAuth, ordersController.createOrder);

router.get('/', isAuth, ordersController.getOrders);

module.exports = router;
