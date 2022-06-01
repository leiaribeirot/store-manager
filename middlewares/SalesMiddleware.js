const { StatusCodes } = require('http-status-codes');

const validateQuantity = (req, res, next) => {
    const quantityMissing = req.body.some((sale) => {
        const { quantity } = sale;
        return !quantity && quantity !== 0;   
    });

    const quantityInvalid = req.body.some((sale) => {
        const { quantity } = sale;
        return quantity <= 0;   
    });

    if (quantityMissing) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: '"quantity" is required' });
    }

    if (quantityInvalid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

module.exports = { validateQuantity };