const express = require('express');

const router = express.Router();

const productController = require('./controllers/ProductController');
const salesController = require('./controllers/SalesController');

router.use('/products', productController);
router.use('/sales', salesController);

module.exports = router;