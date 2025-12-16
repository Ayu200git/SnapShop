const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');
const auth = require('../../middleware/auth');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;

