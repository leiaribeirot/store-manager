const express = require('express');

const router = express.Router();

const productService = require('../services/ProductService');

router.get('/', async (_req, res) => {
    const products = await productService.getServiceAll();
    res.status(200).json(products);
});

router.get('/:id', async (req, res, _next) => {
    const { id } = req.params;

    const [product] = await productService.getServiceById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
});

module.exports = router;