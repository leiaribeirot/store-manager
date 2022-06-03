const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const SalesModel = require('../../../models/SalesModel');

const mockSales = [{id: 1, date: '2022-05-26T17:35:23.000Z', product_id: 1, quantity: 5 }];
const mockSalesId = [{date: '2022-05-26T17:35:23.000Z', product_id: 1, quantity: 5 }];

describe('Sales Model', () => {

    describe('Se a função getSalesAll quando executada', () =>{

        before(() => {
            const result = [mockSales, []];
            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await SalesModel.getSalesAll();
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com todas as vendas', async () => {
            const response = await SalesModel.getSalesAll();
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal(mockSales);
        });
    })

    describe('Se a função getSalesById quando executada', () =>{

        before(() => {
            const result = [mockSalesId, []];
            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await SalesModel.getSalesById(1);
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com uma venda específica', async () => {
            const response = await SalesModel.getSalesById(1);
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal(mockSalesId);
        });
    })

    describe('Se a função insertSales quando executada', () => {
        before(() => {
            const result = [{ insertId: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await SalesModel.insertSales();
            expect(response).to.be.an('array');
        });

        it('verifica se na posição 0 do array contém a propriedade "insertId"', async () => {
            const response = await SalesModel.insertSales();
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('insertId');
        });
    });

    describe('Se a função createSales quando executada', () => {
        before(() => {
            const result = [{ insertId: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await SalesModel.createSales();
            expect(response).to.be.an('array');
        });

        it('verifica se na posição 0 do array contém a propriedade "insertId"', async () => {
            const response = await SalesModel.createSales();
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('insertId');
        });
    });

    describe('Se a função updateSales quando executada', () => {
        before(() => {
            const result = [{ updateId: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna uma array', async () => {
            const response = await SalesModel.updateSales();
            expect(response).to.be.an('array');
        });

        it('verifica se atualiza um ID', async () => {
            const response = await SalesModel.updateSales(1);
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('updateId');
        });
    });
});