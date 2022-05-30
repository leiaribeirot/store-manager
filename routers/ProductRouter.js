const express = require('express');

const ProductController = require('../controllers/ProductController');
const { validateName, validateQuantity } = require('../middlewares/ProductMiddleware');

const validateProduct = [validateName, validateQuantity];

const router = express.Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', validateProduct, ProductController.createProduct);

module.exports = router;