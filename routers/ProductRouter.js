const express = require('express');

const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', ProductController.createProduct);

module.exports = router;