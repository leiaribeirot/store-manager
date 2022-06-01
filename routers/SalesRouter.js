const express = require('express');

const salesController = require('../controllers/SalesController');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.createSales);

module.exports = router;