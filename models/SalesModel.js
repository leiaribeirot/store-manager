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

const isertSales = () => connection.execute('INSERT INTO sales (data) VALUES (now());');

const createSales = (quantity, productId, saleId) =>
connection.execute('INSERT INTO sales_products (sales_id, product_id, quantity) VALUES (?, ?, ?);', 
[saleId, productId, quantity]);

module.exports = {
    getSalesAll,
    getSalesById,
    createSales,
    isertSales,
};