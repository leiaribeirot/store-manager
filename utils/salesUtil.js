const salesAllCamelCase = (sale) => {
    const { id: saleId, product_id: productId, quantity, date } = sale;

    const salesCamelCase = {
        saleId,
        productId,
        quantity,
        date,
    };
    return salesCamelCase;
};

module.exports = {
    salesAllCamelCase,
};