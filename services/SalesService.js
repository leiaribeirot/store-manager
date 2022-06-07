const salesModel = require('../models/SalesModel');
const productModel = require('../models/ProductModel');
const salesProductModel = require('../models/SalesProductModels');

const salesAllCamelCase = ({ id: saleId, product_id: productId, quantity, date }) => {
    const salesCamelCase = {
        saleId,
        productId,
        quantity,
        date,
    };
    return salesCamelCase;
};

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

    await Promise.all(
        sales.map(({ productId, quantity }) => 
            productModel.updateQuantity(productId, quantity, '-')),
    );

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

const deleteSales = async (id) => {
   const [salesResume] = await salesProductModel.getResumeSalesById(id);

   await Promise.all(
    salesResume.map(({ product_id, quantity }) =>
        productModel.updateQuantity(product_id, quantity, '+')),

   );

   const saleId = await getServiceById(id);

    if (!saleId.length) return false;

    await salesModel.deleteSales(id);
    await salesModel.deleteSaleProducts(id);

    return true;
};

module.exports = {
    getServiceAll,
    getServiceById,
    createSales,
    updateSales,
    salesAllCamelCase,
    deleteSales,
};