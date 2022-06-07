const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const SalesService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');

const sales = [{ id: 1, date: '2022-06-03T17:36:22.000Z', product_id: 1, quantity: 5, }]
const salesById = [{ date: '2022-06-03T17:36:22.000Z', product_id: 1, quantity: 5 }]
const productsToSale = [{ productId: 1, quantity: 2 }];

describe('Sales Service', () => {

    describe('Se a função getServiceAll quando executada',  () => {
        before(() => {
            sinon.stub(SalesModel, 'getSalesAll').resolves([sales]);
        });
    
        after(() => {
            SalesModel.getSalesAll.restore();
        });

        it('nomaliza o array com todas as vendas', async () => {
            const response = await SalesService.getServiceAll();
            expect(response).to.be.an('array');
            expect(response).to.deep.equal(sales.map(SalesService.salesAllCamelCase));
        });
    });

    describe('Se a função getServiceAll quando executada',  () => {
        it('retorna um objeto', () => {
            const response = SalesService.salesAllCamelCase(sales[0]);
            expect(response).to.be.an('object');
        });

        it('verifica se as propriedades do objeto estão corretas', () => {
            const response = SalesService.salesAllCamelCase(sales[0]);
            expect(response).to.have.property('saleId');
            expect(response).to.have.property('date');
            expect(response).to.have.property('productId');
            expect(response).to.have.property('quantity');
        });
    });

    describe('Se a função getServiceById quando executada',  () => {
        before(() => {
            sinon.stub(SalesModel, 'getSalesById').resolves([salesById]);
        });
    
        after(() => {
            SalesModel.getSalesById.restore();
        });

        it('verifica se a venda já existe no banco de dados', async () => {
            const response = await SalesService.getServiceById(1);
            expect(response).to.be.an('array');
        })

        it('verifica se a venda com ID específico é normalizado', async () => {
            const response = await SalesService.getServiceById(1);
            expect(response).to.be.an('array');
            expect(response).to.be.deep.equal(salesById.map(SalesService.salesAllCamelCase));
        })
    });

    describe('Se a função createSales quando executada',  () => {
        before(() => {
            sinon.stub(connection, 'execute')
            .onFirstCall()
            .resolves([[{ product_id: 1, quantity: 2 }], []])
            .onSecondCall()
            .resolves([{ insertId: 3 }, []]);
        });
    
        after(() => {
           connection.execute.restore();
        });

        it('as propriedades do objeto estão corretas', async () => {
            const response = await SalesService.createSales([productsToSale[0]]);
            expect(response).to.have.property('id');
            expect(response).to.have.property('itemsSold');
        })
    });

    describe('Se a função updateSales quando executada',  () => {
        before(() => {
            sinon.stub(SalesModel, 'updateSales').resolves();
        });
    
        after(() => {
            SalesModel.updateSales.restore();
        });

        it('as propriedades do objeto estão corretas', async () => {
            const response = await SalesService.updateSales(1, productsToSale);
            expect(response).to.have.property('saleId');
            expect(response).to.have.property('itemUpdated');
        })
    });
});

