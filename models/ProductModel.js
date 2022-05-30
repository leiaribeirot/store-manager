const connection = require('../db/connection');

const getProductAll = () => connection.execute('SELECT * FROM products');

const getProductById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const getByName = (name) => connection.execute('SELECT * FROM products WHERE name = ?', [name]);

const createProduct = (name, quantity) => 
connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

module.exports = { 
    getProductAll, 
    getProductById,
    getByName,
    createProduct,
 };