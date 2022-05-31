const { StatusCodes } = require('http-status-codes');
const productService = require('../services/ProductService');

const getAll = async (_req, res) => {
    const products = await productService.getServiceAll();
    res.status(StatusCodes.OK).json(products);
};

const getById = async (req, res, _next) => {
    const { id } = req.params;

    const [product] = await productService.getServiceById(id);

    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req, res, _next) => {
    const data = await productService.createProduct(req.body);

    if (data.error) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Product already exists' });
    }

    return res.status(StatusCodes.CREATED).json(data);
};

const updateProduct = async (req, res, _next) => {
    const { id } = req.params;
    const productId = await productService.getServiceById(id);

   if (!productId.length) {
     return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
   }

   const product = await productService.updateProduct({ ...req.body, id });
   res.status(StatusCodes.OK).json(product);
};

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
};