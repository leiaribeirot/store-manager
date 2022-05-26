const connection = require('../db/connection');

const getSalestAll = () => connection.execute(
    'SELECT * FROM sales_products ORDER BY sale_id, product_id',
);

module.exports = {
    getSalestAll,
};