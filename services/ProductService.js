const productModel = require('../models/ProductModel');

const getServiceAll = async () => {
    const [products] = await productModel.getProductAll();
    return products;
};

const getServiceById = async (id) => {
    const [products] = await productModel.getProductById(id);
    return products;
};

module.exports = {
    getServiceAll,
    getServiceById,
};