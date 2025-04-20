import { AppDataSource } from '../database/data-source';
import { Employee, EmployeeRole } from '../entities/Employee';


export interface CreateEmployerParams {
  nome: string;
  matricula: string;
  contratadoEm: Date;
  funcao: EmployeeRole;
}

export async function createEmployer({ nome, matricula, contratadoEm, funcao }: CreateEmployerParams) {
  const repo = AppDataSource.getRepository(Employee);
  const employee = repo.create({ nome, matricula, contratadoEm, funcao });
  await repo.save(employee);
  return employee;
}
export async function getEmployers() {
  const repo = AppDataSource.getRepository(Employee);
  return await repo.find();
}
export async function getEmployerById(id: number) {
  const repo = AppDataSource.getRepository(Employee);  
  return await repo.findOneBy({ id });  
}   
export async function updateEmployer(id: number, { nome, matricula, contratadoEm, funcao }: CreateEmployerParams) {
  const repo = AppDataSource.getRepository(Employee);
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
export async function deleteEmployer(id: number) {
  const repo = AppDataSource.getRepository(Employee);
  const employee = await repo.findOneBy({ id });
  if (!employee) {
    throw new Error('Employee not found');
  }
  return await repo.remove(employee);
}
export async function getEmployersByRole(role: EmployeeRole) {
  const repo = AppDataSource.getRepository(Employee);
  return await repo.find({ where: { funcao: role } });
}