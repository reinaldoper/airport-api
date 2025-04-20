"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCashFlow = createCashFlow;
exports.getCashFlowReport = getCashFlowReport;
exports.getCashFlowHistory = getCashFlowHistory;
exports.getCashFlowById = getCashFlowById;
exports.updateCashFlow = updateCashFlow;
exports.deleteCashFlow = deleteCashFlow;
exports.deleteAllCashFlows = deleteAllCashFlows;
exports.getCashFlowByType = getCashFlowByType;
exports.getCashFlowByDescription = getCashFlowByDescription;
exports.getCashFlowByDate = getCashFlowByDate;
const data_source_1 = require("../database/data-source");
const CashFlow_1 = require("../entities/CashFlow");
async function createCashFlow({ description, amount, type, planeId }) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    const planeRepo = data_source_1.AppDataSource.getRepository('Plane');
    const plane = await planeRepo.findOneBy({ id: planeId });
    if (!plane) {
        throw new Error('Plane not found');
    }
    const entry = repo.create({ description, amount, type, plane });
    return await repo.save(entry);
}
async function getCashFlowReport() {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    const all = await repo.find();
    const income = all.filter(f => f.type === 'income').reduce((acc, cur) => acc + Number(cur.amount), 0);
    const expense = all.filter(f => f.type === 'expense').reduce((acc, cur) => acc + Number(cur.amount), 0);
    const balance = income - expense;
    return {
        balance,
        income,
        expense,
        history: all,
    };
}
async function getCashFlowHistory() {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.find();
}
async function getCashFlowById(id) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.findOneBy({ id });
}
async function updateCashFlow(id, { description, amount, type, planeId }) {
    const planeRepo = data_source_1.AppDataSource.getRepository('Plane');
    const plane = await planeRepo.findOneBy({ id: planeId });
    if (!plane) {
        throw new Error('Plane not found');
    }
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    const entry = await repo.findOneBy({ id });
    if (!entry) {
        throw new Error('CashFlow not found');
    }
    entry.description = description;
    entry.amount = amount;
    entry.type = type;
    entry.plane = plane;
    entry.planeId = planeId;
    entry.createdAt = new Date();
    return await repo.save(entry);
}
async function deleteCashFlow(id) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    const entry = await repo.findOneBy({ id });
    if (!entry) {
        throw new Error('CashFlow not found');
    }
    return await repo.remove(entry);
}
async function deleteAllCashFlows() {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    const entries = await repo.find();
    return await repo.remove(entries);
}
async function getCashFlowByType(type) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.findBy({ type });
}
async function getCashFlowByDescription(description) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.findBy({ description });
}
async function getCashFlowByDate(date) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.findBy({ createdAt: date });
}
