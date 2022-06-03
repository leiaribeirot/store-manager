const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const sinon = require('sinon');
const SalesController = require('../../../controllers/SalesController');
const SalesService = require('../../../services/SalesService');

const req = {};
const res = {};
const mockSales = [{id: 1, date: '2022-05-26T17:35:23.000Z', product_id: 1, quantity: 5 }];

describe('Sales Controller', () => {

    describe('Se a função getAll quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(SalesService, 'getServiceAll').resolves([mockSales]);
        });

        after(() => {
            SalesService.getServiceAll.restore();
            sinon.restore();
        });

        it('é chamada com status code "200"', async () => {
            await SalesController.getAll(req, res);
            expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
        });

        it('é chamada com a mensagem correta', async () => {
            await SalesController.getAll(req, res);
            expect(res.json.calledWith([mockSales])).to.be.true;
        });
    });

    describe('Se a função getById quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            req.params = { id: 1 };

            sinon.stub(SalesService, 'getServiceById').resolves([]);
        });

        after(() => {
            SalesService.getServiceById.restore();
            sinon.restore();
        });
        
        it('retorna status corde "404" quando a venda não é encontrada', async () => {
            await SalesController.getById(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando a venda não é encontrada', async () => {
            await SalesController.getById(req, res);
            expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
        });
    });

    describe('Se a função createSales quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
                    
            sinon.stub(SalesService, 'createSales').resolves(false);
        });

        after(() => {
            SalesService.createSales.restore();
            sinon.restore();
        });
        
        it('retorna status corde "404" quando a venda não é encontrada', async () => {
            await SalesController.createSales(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando a venda não é encontrada', async () => {
            await SalesController.createSales(req, res);
            expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
        });
    });

    describe('Se a função updateSales quando executada', () => { 
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(SalesService, 'updateSales').resolves(false);
        });

        after(() => {
            SalesService.updateSales.restore();

            sinon.restore();
        });
        
        it('retorna status corde "404" quando a venda já existe no banco de dados', async () => {
            await SalesController.updateSales(req, res);
            expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
        });

        it('retorna a mensagem correta quando a venda já existe no banco de dados', async () => {
            await SalesController.updateSales(req, res);
            expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
        });
    });
});