const salesModel = require('../models/SalesModel');

const salesCamelCase = (sale) => {
    const { sale_id: saleId, procuct_id: productId, quantity, date } = sale;
    const saleCamelCase = { saleId, productId, quantity, date };
    return saleCamelCase;
};

const getServiceAll = async () => {
    const [sales] = await salesModel.getSalesAll();
    const formatSalesAll = sales.map(salesCamelCase);
    return formatSalesAll;
};

const getSalesById = async (id) => {
    const [sales] = await salesModel.getSalesById(id);
    const formatSalesById = sales.map(salesCamelCase);
    return formatSalesById;
};

module.exports = {
    getServiceAll,
    getSalesById,
};