const productModel = require('../models/ProductModel');

const getServiceAll = async () => {
    const products = await productModel.getProductAll();
    return products;
};

const getServiceById = async (id) => {
    const [products] = await productModel.getProductById(id);
    return products;
};

const createProduct = async ({ name, quantity }) => {
    const [product] = await productModel.getByName(name);

    if (product.length) return false;

    const [newProduct] = await productModel.createProduct(name, quantity);
    return { id: newProduct.insertId, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
    await productModel.updateProduct(name, quantity, id);
    return { id, name, quantity };
};

const deleteProduct = async (id) => {
    const [product] = await productModel.deleteProduct(id);
    return product;
};

module.exports = {
    getServiceAll,
    getServiceById,
    createProduct,
    updateProduct,
    deleteProduct,
};