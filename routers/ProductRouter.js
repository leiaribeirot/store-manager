const express = require('express');

const ProductController = require('../controllers/ProductController');
const { validateName, validateQuantity } = require('../middlewares/ProductMiddleware');

const router = express.Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', validateName, validateQuantity, ProductController.createProduct);

module.exports = router;