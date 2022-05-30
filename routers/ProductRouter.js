const express = require('express');

const productController = require('../controllers/ProductController');
const validateProduct = require('../middlewares/ProductMiddleware');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', validateProduct, productController.createProduct);

module.exports = router;