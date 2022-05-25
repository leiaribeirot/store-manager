const connection = require('../db/connection');

const getProductAll = () => connection.execute('SELECT * FROM products');


module.exports = { getProductAll };