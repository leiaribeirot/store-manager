const express = require('express');

const productRouter = require('./ProductRouter');
const salesRouter = require('./SalesRouter');

const router = express.Router();

router.use('/products', productRouter);
router.use('/sales', salesRouter);

module.exports = router;