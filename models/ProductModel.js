const connection = require('../db/connection');

const getProductAll = () => connection.execute('SELECT * FROM products');

const getProductById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const getByName = (name) => connection.execute('SELECT * FROM products WHERE name = ?', [name]);

const createProduct = (name, quantity) => 
connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

const updateProduct = (name, quantity, id) => 
connection.execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);

const deleteProduct = (id) => connection.execute('DELETE FROM products WHERE id = ?', [id]);

const updateQuantity = (id, quantity, type) =>
connection.execute(`UPDATE products SET quantity = quantity ${type} ${quantity} WHERE id = ${id}`);

module.exports = { 
    getProductAll, 
    getProductById,
    getByName,
    createProduct,
    updateProduct,
    deleteProduct,
    updateQuantity,
 };