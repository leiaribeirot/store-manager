const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const ProductController = require('../../../controllers/ProductController');
const ProductService = require('../../../services/ProductService');

const mockProducts = [{id: 1, name:'Martelo de Thor', quantity: '10'}];
// const mockNewProduct = { id: 1, name: 'New Product', quantity: 10 };
const req = {};
const res = {};

describe.only('Product Controller', () => {

    describe('Se a função getAll quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(ProductService, 'getServiceAll').resolves([mockProducts]);
        });

        after(() => {
            ProductService.getServiceAll.restore();
            sinon.restore();
        });
        
        it('é chamada com status code "200"', async () => {
            await ProductController.getAll(req, res);
            expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
        });

        it('é chamada com a mensagem correta', async () => {
            await ProductController.getAll(req, res);
            expect(res.json.calledWith(mockProducts)).to.be.true;
        });
    });

    describe('Se a função getById quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            req.params = { id: 1 };

            sinon.stub(ProductService, 'getServiceById').resolves([]);
        });

        after(() => {
            ProductService.getServiceById.restore();
            sinon.restore();
        });
        
        it('retorna status corde "404" quando produto não é encontrado', async () => {
            await ProductController.getById(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando o produto não é encontrado', async () => {
            await ProductController.getById(req, res);
            expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
        });
    });

    describe('Se a função createProduct quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
                    
            sinon.stub(ProductService, 'createProduct').resolves(false);
        });

        after(() => {
            ProductService.createProduct.restore();
            sinon.restore();
        });
        
        it('retorna status corde "409" quando produto já existe no banco de dados', async () => {
            await ProductController.createProduct(req, res);
            expect(res.status.calledWith(StatusCodes.CONFLICT)).to.be.true;
        });

        it('retorna a mensagem correta quando o produto já existe no banco de dados', async () => {
            await ProductController.createProduct(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.true;
        });
    });

    describe('Se a função updateProduct quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(ProductService, 'getServiceById').resolves([]);
            sinon.stub(ProductService, 'updateProduct').resolves({error: 'Product not found'});
        });

        after(() => {
            ProductService.updateProduct.restore();
            ProductService.getServiceById.restore();

            sinon.restore();
        });
        
        it('retorna status corde "404" quando produto já existe no banco de dados', async () => {
            await ProductController.updateProduct(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando o produto já existe no banco de dados', async () => {
            await ProductController.updateProduct(req, res);
            expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
        });
    });

    describe('Se a função deleteProduct quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(ProductService, 'getServiceById').resolves([]);
            sinon.stub(ProductService, 'deleteProduct').resolves({error: 'Product not found'});
        });

        after(() => {
            ProductService.deleteProduct.restore();
            ProductService.getServiceById.restore();

            sinon.restore();
        });
        
        it('retorna status corde "404" quando produto não existe no banco de dados', async () => {
            await ProductController.deleteProduct(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando o produto não existe no banco de dados', async () => {
            await ProductController.deleteProduct(req, res);
            expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
        });
    });
});