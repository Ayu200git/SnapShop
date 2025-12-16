const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/api/adminController');
const auth = require('../../middleware/auth');

router.get('/dashboard', auth, adminController.getDashboardData);
router.get('/users', auth, adminController.getAllUsers);
router.get('/orders', auth, adminController.getAllOrders);

module.exports = router;

