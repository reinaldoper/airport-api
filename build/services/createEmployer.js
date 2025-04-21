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
/**
 * @description Creates a new employee in the database.
 * @param {CreateEmployerParams} params - An object containing the details of the employee to create.
 * @param {string} params.nome - The name of the employee.
 * @param {string} params.matricula - The unique matricula of the employee.
 * @param {Date} params.contratadoEm - The date the employee was hired.
 * @param {EmployeeRole} params.funcao - The role of the employee.
 * @returns {Promise<Employee>} - A promise that resolves to the newly created employee.
 */
async function createEmployer({ nome, matricula, contratadoEm, funcao }) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const employee = repo.create({ nome, matricula, contratadoEm, funcao });
    await repo.save(employee);
    return employee;
}
/**
 * @description Retrieves all employees from the database.
 * @returns {Promise<Employee[]>} - A promise that resolves to an array of all employees in the database.
 */
async function getEmployers() {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.find();
}
/**
 * @description Finds an employee by their ID.
 * @param {number} id - The ID of the employee to find.
 * @returns {Promise<Employee | null>} - A promise that resolves to the employee if found, otherwise null.
 */
async function getEmployerById(id) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.findOneBy({ id });
}
/**
 * @description Updates an existing employee in the database.
 * @param {number} id - The ID of the employee to update.
 * @param {CreateEmployerParams} params - An object containing the updated employee details.
 * @returns {Promise<Employee>} - A promise that resolves to the updated employee.
 * @throws {Error} - Throws an error if the employee is not found.
 */
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
/**
 * @description Deletes an employee by their ID
 * @param {number} id - The ID of the employee to delete
 * @returns {Promise<Employee>} - A promise that resolves to the deleted employee
 * @throws {Error} - Throws an error if the employee is not found
 */
async function deleteEmployer(id) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const employee = await repo.findOneBy({ id });
    if (!employee) {
        throw new Error('Employee not found');
    }
    return await repo.remove(employee);
}
/**
 * @description Retrieves a list of employees by their role
 * @param {EmployeeRole} role - The role of the employees to retrieve
 * @returns {Promise<Employee[]>} - A promise that resolves to a list of employees with the specified role
 * @throws {Error} - Throws an error if the retrieval fails
 */
async function getEmployersByRole(role) {
    const repo = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    return await repo.find({ where: { funcao: role } });
}
