const express = require('express');
const router = express.Router();

const cartController = require('../../controllers/cart');
const isAuth = require('../../middleware/is-auth');

router.get('/', isAuth, cartController.getCart);

router.post('/add', isAuth, cartController.addToCart);

router.post('/remove', isAuth, cartController.removeFromCart);

router.put('/update', isAuth, cartController.updateCartItem);

router.delete('/clear', isAuth, cartController.clearCart);

module.exports = router;
