const salesModel = require('../models/SalesModel');

const salesCamelCase = (sale) => {
    const { sale_id: saleId, procuct_id: productId, quantity, date } = sale;
    const saleCamelCase = { saleId, productId, quantity, date };
    return saleCamelCase;
};

const getServiceAll = async () => {
    const [sales] = await salesModel.getSalesAll();
    const formatSales = sales.map(salesCamelCase);
    return formatSales;
};

module.exports = {
    getServiceAll,
};