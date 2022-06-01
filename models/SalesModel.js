const connection = require('../db/connection');

const getSalesAll = () => connection.execute(
    `SELECT s.id, s.date, sp.product_id, sp.quantity FROM sales AS s 
        INNER JOIN sales_products AS sp
        ON s.id = sp.sale_id;`,
);

const getSalesById = (id) => connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales AS s 
        INNER JOIN sales_products AS sp 
        ON s.id = sp.sale_id WHERE s.id = ?;`, [id],
);

const insertSales = () => connection.execute('INSERT INTO sales (date) VALUES (NOW())');

const createSales = (quantity, productId, saleId) =>
connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
[saleId, productId, quantity]);

const updateSales = (saleId, productId, quantity) => 
connection.execute('UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
[quantity, saleId, productId]);

module.exports = {
    getSalesAll,
    getSalesById,
    createSales,
    insertSales,
    updateSales,
};