const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const ProductService = require('../../../services/ProductService');

const mockProducts = [[{id: 1, name: 'product', quantity:  10}]];

describe.only('ProductService', () => {
   
    describe('Se a função getServiceAll quando executada', () => {
        before(() => {
            const result = [[mockProducts]];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductService.getServiceAll();
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com todos os produtos', async () => {
            const response = await ProductService.getServiceAll();
            expect(response).to.be.an('array');
            expect(response[0]).to.deep.equal(mockProducts);
        });
    });

    describe('Se a função  getServiceById  quando executada', () => {
        before(() => {
            const result = [[mockProducts[0]]];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductService.getServiceById(1);
            expect(response).to.be.an('array');
        });

        it('retorna na posição 0 um array com um produto específico', async () => {
            const response = await ProductService.getServiceById(1);
            expect(response[0]).to.be.an('array');
            expect(response[0]).to.be.deep.equal(mockProducts[0]);
        });
    });

    describe('Se a função createProduct quando executada', () => {
        before(() => {
            const result = [[mockProducts]];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('verifica se o produto já existe', async () => {
            const response = await ProductService.createProduct({name: 'product', quantity:  10});
            expect(response.error).to.equals('Product already exists');
        });
    });

    describe('Se a função createProduct quando executada', () => {
        before(() => {
            const result = [[]];
            const result2 = [{insertId: 1}];
            sinon.stub(connection, 'execute')
            .onFirstCall().resolves(result).onSecondCall().resolves(result2);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('cria um novo produto', async () => {
            const response = await ProductService.createProduct({name: 'product', quantity:  10});
            expect(response).to.be.an('object');
        });
    });

    describe('Se a função updateProduct quando executada', () => {
        before(() => {
            sinon.stub(connection, 'execute')
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('atualiza um novo produto', async () => {
            const response = await ProductService.updateProduct({name: 'product', quantity:  10});
            expect(response).to.be.an('object');
            expect(response).to.have.property('id');

        });
    });

    describe('Se a função deleteProduct quando executada', () => {
        before(() => {
            const result = [[]];
            sinon.stub(connection, 'execute').resolves(result);
        });
    
        after(() => {
            connection.execute.restore();
        });

        it('deleta o produto', async () => {
            const response = await ProductService.deleteProduct(1);
            expect(response).to.be.an('array');
        });
    });

});