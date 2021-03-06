const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/SalesService');

const getAll = async (_req, res) => {
    const sales = await salesService.getServiceAll();
    return res.status(StatusCodes.OK).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getServiceById(id);
    if (sale.length !== 0) {
        return res.status(StatusCodes.OK).json(sale);
    }
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
};

const createSales = async (req, res, _next) => {
    const sales = await salesService.createSales(req.body);

    if (!sales) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: 'Such amount is not permitted to sell' });
    }

    res.status(StatusCodes.CREATED).json(sales);
};

const updateSales = async (req, res, _next) => {
    const { id } = req.params;
    
    const updateSale = await salesService.updateSales(id, req.body);

    if (!updateSale) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
    }

    return res.status(StatusCodes.OK).json(updateSale);
};

const deleteSales = async (req, res, _next) => {
    const { id } = req.params;

    const sales = await salesService.deleteSales(id);

    if (!sales) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
    }

    return res.status(StatusCodes.NO_CONTENT).end();    
};

module.exports = {
    getAll,
    getById,
    createSales,
    updateSales,
    deleteSales,
};