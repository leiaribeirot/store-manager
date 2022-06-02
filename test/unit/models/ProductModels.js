const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const ProductModel = require('../../../models/ProductModel');

const mockProducts = [{id: 1, name:'Martelo de Thor', quantity: '10'}];

describe('ProductModel', () => {
   
    describe('Se a função getProductAll quando executada', () => {
        before(() => {
            const result = [mockProducts, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductModel.getProductAll();
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com os produtos', async () => {
            const response = await ProductModel.getProductAll();
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal(mockProducts);
        });
    });

    describe('Se a função  getProductById  quando executada', () => {
        before(() => {
            const result = [[mockProducts[0]], []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductModel.getProductById(1);
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com um produto específico', async () => {
            const response = await ProductModel.getProductById(1);
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal([mockProducts[0]]);
        });
    });
    describe('Se a função  getByName quando executada', () => {
        before(() => {
            const result = [[mockProducts], []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductModel.getByName('Martelo de Thor');
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com o nome de um produto específico', async () => {
            const response = await ProductModel.getByName('Martelo de Thor');
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal([mockProducts]);
        });
    });

    describe('Se a função createProduct quando executada', () => {
        before(() => {
            const result = [{ insertId: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna uma array', async () => {
            const response = await ProductModel.createProduct('Martelo de Thor', 10);
            expect(response).to.be.an('array');
        });

        it('verifica se na posição 0 do array contém a propriedade "insetedId"', async () => {
            const response = await ProductModel.createProduct('Martelo de Thor', 10);
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('insertId');
        });
    });

    describe('Se a função updateProduct quando executada', () => {
        before(() => {
            const result = [{ update: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retona uma array', async () => {
            const response = await ProductModel.updateProduct(1, 'Martelo de Thor', 10);
            expect(response).to.be.an('array');
        });

        it('verifica se atualiza um ID', async () => {
            const response = await ProductModel.updateProduct(1, 'Martelo de Thor', 10);
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('update');
        });
    });

    describe('Se a função deleteProduct quando executada', () => {
        before(() => {
            const result = [{ update: 1 }, []];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retona uma array', async () => {
            const response = await ProductModel.deleteProduct(1, 'Martelo de Thor', 10);
            expect(response).to.be.an('array');
        });

        it('verifica se deleta um ID', async () => {
            const response = await ProductModel.deleteProduct(1, 'Martelo de Thor', 10);
            expect(response).to.be.an('array');
            expect(response[0]).to.haveOwnProperty('update');
        });
    });
});