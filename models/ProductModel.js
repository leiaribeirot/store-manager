const connection = require('../db/connection');

const getProductAll = () => connection.execute('SELECT * FROM products');

const getProductById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

module.exports = { getProductAll, getProductById };