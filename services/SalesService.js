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

const updateSales = async (id, product) => {
    const { productId, quantity } = product[0];

    await salesModel.updateSales(id, productId, quantity);
  
    return {
      saleId: id,
      itemUpdated: product,
    };
};

module.exports = {
    getServiceAll,
    getServiceById,
    createSales,
    updateSales,
};