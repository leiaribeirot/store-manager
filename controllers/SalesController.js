const salesService = require('../services/SalesService');

const getAll = async (_req, res) => {
    const sales = await salesService.getServiceAll();
    return res.status(200).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getServiceById(id);
    if (sale.length !== 0) {
        return res.status(200).json(sale);
    }
    return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
    getAll,
    getById,
};