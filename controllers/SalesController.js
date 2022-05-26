const express = require('express');

const router = express.Router();

const salesService = require('../services/SalesService');

router.get('/', async (req, res) => {
    const sales = salesService.getServiceAll();
    res.status(200).json(sales);
});

module.exports = router;