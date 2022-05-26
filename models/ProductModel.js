const connection = require('../db/connection');

const getProductAll = () => connection.execute('SELECT * FROM products');

const getProductById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const getByName = (name) => connection.execute('SELECT * FROM products WHERE name = ?', [name]);

module.exports = { 
    getProductAll, 
    getProductById,
    getByName,
 };