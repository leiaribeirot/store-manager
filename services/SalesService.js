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

module.exports = {
    getServiceAll,
    getServiceById,
};