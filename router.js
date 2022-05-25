const express = require('express');

const router = express.Router();

const productControler = require('./controllers/ProductController');

router.use('/products', productControler);

module.exports = router;