const productModel = require('../models/ProductModel');

const getServiceAll = async () => {
    const [products] = await productModel.getProductAll();
    return products;
};

const getServiceById = async (id) => {
    const [products] = await productModel.getProductById(id);
    return products;
};

const createProduct = async ({ name, quantity }) => {
    const [product] = await productModel.getByName(name);

    if (product.length) return { error: 'Product already exists' };

    const [newProduct] = await productModel.createProduct(name, quantity);
    return { id: newProduct.insertId, name, quantity };
};

module.exports = {
    getServiceAll,
    getServiceById,
    createProduct,
};