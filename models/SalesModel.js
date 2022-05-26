const connection = require('../db/connection');

const getSalestAll = () => connection.execute(
    'SELECT * FROM sales_products ORDER BY sale_id, product_id',
);

const getSalesById = (id) => connection.execute(
    'SELECT * FROM sales_products WHERE sales_id = ?', [id],
);

module.exports = {
    getSalestAll,
    getSalesById,
};