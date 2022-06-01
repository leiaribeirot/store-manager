const express = require('express');

const SalesController = require('../controllers/SalesController');
const { validateProductId } = require('../middlewares/ProductMiddleware');
const { validateQuantity } = require('../middlewares/SalesMiddleware');

const validateSales = [validateProductId, validateQuantity];

const router = express.Router();

router.get('/', SalesController.getAll);

router.get('/:id', SalesController.getById);

router.post('/', validateSales, SalesController.createSales);

module.exports = router;