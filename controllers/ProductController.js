const express = require('express');

const router = express.Router();

const productService = require('../services/ProductService');

router.get('/', async (_req, res) => {
    const products = await productService.getServiceAll();
    res.status(200).json(products);
});

module.exports = router;