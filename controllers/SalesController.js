const express = require('express');

const router = express.Router();

const salesService = require('../services/SalesService');

router.get('/', async (req, res) => {
    const sales = salesService.getServiceAll();
    res.status(200).json(sales);
});

router.get('/:id', async (req, res, _next) => {
    const { id } = req.params;
    const [sales] = salesService.getSalesById(id);
    if (!sales) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sales);
});

module.exports = router;