const express = require('express');

const router = express.Router();

const productRouter = require('./ProductRouter');
const salesRouter = require('./SalesRouter');

router.use('/products', productRouter);
router.use('/sales', salesRouter);

module.exports = router;