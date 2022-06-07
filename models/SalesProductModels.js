const connection = require('../db/connection');

const getResumeSalesById = (id) => 
connection.execute('SELECT product_id, quantity FROM sales_products WHERE sale_id = ?', [id]);

module.exports = {
    getResumeSalesById,
}; 