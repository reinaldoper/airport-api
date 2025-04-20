"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployer = createEmployer;
exports.getEmployers = getEmployers;
exports.getEmployerById = getEmployerById;
exports.updateEmployer = updateEmployer;
exports.deleteEmployer = deleteEmployer;
exports.getEmployersByRole = getEmployersByRole;
const data_source_1 = require("../database/data-source");
const Employee_1 = require("../entities/Employee");
async function createEmployer({ nome, matricula, contratadoEm, funcao }) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const employee = repo.create({ nome, matricula, contratadoEm, funcao });
    await repo.save(employee);
    return employee;
}
async function getEmployers() {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.find();
}
async function getEmployerById(id) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.findOneBy({ id });
}
async function updateEmployer(id, { nome, matricula, contratadoEm, funcao }) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const employee = await repo.findOneBy({ id });
    if (!employee) {
        throw new Error('Employee not found');
    }
    employee.nome = nome;
    employee.matricula = matricula;
    employee.contratadoEm = contratadoEm;
    employee.funcao = funcao;
    return await repo.save(employee);
}
async function deleteEmployer(id) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const employee = await repo.findOneBy({ id });
    if (!employee) {
        throw new Error('Employee not found');
    }
    return await repo.remove(employee);
}
async function getEmployersByRole(role) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.find({ where: { funcao: role } });
}
