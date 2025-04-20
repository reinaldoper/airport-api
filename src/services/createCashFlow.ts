
import { AppDataSource } from '../database/data-source';
import { CashFlow, CashFlowType } from '../entities/CashFlow';

export interface CreateCashFlowParams {
  description: string;
  amount: number;
  planeId: number;
  type: CashFlowType;
}

export async function createCashFlow({ description, amount, type, planeId }: CreateCashFlowParams) {
  const repo = AppDataSource.getRepository(CashFlow);
  const planeRepo = AppDataSource.getRepository('Plane');
  const plane = await planeRepo.findOneBy({ id: planeId });
  if (!plane) {
    throw new Error('Plane not found');
  }
  const entry = repo.create({ description, amount, type, plane });
  return await repo.save(entry);
}

export async function getCashFlowReport() {
  const repo = AppDataSource.getRepository(CashFlow);

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
export async function getCashFlowHistory() {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.find();
}
export async function getCashFlowById(id: number) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findOneBy({ id });
}
export async function updateCashFlow(id: number, { description, amount, type, planeId }: CreateCashFlowParams) {
  const planeRepo = AppDataSource.getRepository('Plane');
  const plane = await planeRepo.findOneBy({ id: planeId });
  if (!plane) {
    throw new Error('Plane not found');
  }
  const repo = AppDataSource.getRepository(CashFlow);

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
export async function deleteCashFlow(id: number) {
  const repo = AppDataSource.getRepository(CashFlow);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('CashFlow not found');
  }
  return await repo.remove(entry);
}
export async function deleteAllCashFlows() {
  const repo = AppDataSource.getRepository(CashFlow);

  const entries = await repo.find();
  return await repo.remove(entries);
}
export async function getCashFlowByType(type: CashFlowType) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ type });
}
export async function getCashFlowByDescription(description: string) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ description });
}
export async function getCashFlowByDate(date: Date) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ createdAt: date });
}
