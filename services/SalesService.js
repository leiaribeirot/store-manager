const salesModel = require('../models/SalesModel');
const { salesAllCamelCase } = require('../utils/salesUtil');

const getServiceAll = async () => {
    const [sales] = await salesModel.getSalesAll();
    const formatSalesAll = sales.map(salesAllCamelCase);
    return formatSalesAll;
};

const getServiceById = async (id) => {
    const [sales] = await salesModel.getSalesById(id);
    const formatSalesById = sales.map(salesAllCamelCase);
    return formatSalesById;
};

const createSales = async (sales) => {
    const [sale] = await salesModel.insertSales();
    const { insertId } = sale;

    await Promise.all(sales.map(({ quantity, productId }) => 
    salesModel.createSales(quantity, productId, insertId)));

    return {
        id: insertId,
        itemsSold: sales,
    };
};

module.exports = {
    getServiceAll,
    getServiceById,
    createSales,
};