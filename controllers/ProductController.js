const productService = require('../services/ProductService');

const getAll = async (_req, res) => {
    const products = await productService.getServiceAll();
    res.status(200).json(products);
};

const getById = async (req, res, _next) => {
    const { id } = req.params;

    const [product] = await productService.getServiceById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
};

const createProduct = async (req, res, next) => {
    const { name, quantity } = req.body;

    const data = await productService.createProduct({ name, quantity });

    if (data.error) return next(data.error);

    return res.status(201).json(data);
};

module.exports = {
    getAll,
    getById,
    createProduct,
};