
import { AppDataSource } from '../database/data-source';
import { CashFlow, CashFlowType } from '../entities/CashFlow';

export interface CreateCashFlowParams {
  description: string;
  amount: number;
  planeId: number;
  type: CashFlowType;
}

/**
 * Create a new cash flow entry
 * @param {CreateCashFlowParams} params object with description, amount, type and planeId
 * @returns {Promise<CashFlow>} a promise with the created cash flow entry
 * @throws {Error} if the plane with the given id is not found
 */
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

  /**
   * @description Get the current cash flow report
   * @returns {Promise<{
   *   balance: number;
   *   income: number;
   *   expense: number;
   *   history: CashFlow[];
   * }>} a promise with an object containing the balance, income, expense and history of all cash flows
   */
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
  /**
   * @description Get all cash flow entries
   * @returns {Promise<CashFlow[]>} a promise with an array of all cash flow entries
   */
export async function getCashFlowHistory() {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.find();
}
/**
 * @description Retrieves a cash flow entry by its ID from the database.
 * @param {number} id The ID of the cash flow entry to retrieve.
 * @returns {Promise<CashFlow | null>} A promise that resolves to the CashFlow entity with the given ID
 * or null if no entry is found.
 */

export async function getCashFlowById(id: number) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findOneBy({ id });
}
/**
 * @description Updates an existing cash flow entry by its ID.
 * @param {number} id - The ID of the cash flow entry to update.
 * @param {CreateCashFlowParams} params - An object containing the updated description, amount, type, and planeId.
 * @returns {Promise<CashFlow>} A promise that resolves to the updated cash flow entry.
 * @throws {Error} If the plane with the given planeId is not found or if the cash flow entry with the given ID is not found.
 */

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
  /**
   * @description Deletes a cash flow entry by its ID.
   * @param {number} id The ID of the cash flow entry to delete.
   * @returns {Promise<CashFlow>} A promise that resolves to the deleted cash flow entry.
   * @throws {Error} If the cash flow entry with the given ID is not found.
   */
export async function deleteCashFlow(id: number) {
  const repo = AppDataSource.getRepository(CashFlow);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('CashFlow not found');
  }
  return await repo.remove(entry);
}
  /**
   * @description Deletes all cash flow entries from the database.
   * @returns {Promise<CashFlow[]>} A promise that resolves to an array of the deleted cash flow entries.
   */
export async function deleteAllCashFlows() {
  const repo = AppDataSource.getRepository(CashFlow);

  const entries = await repo.find();
  return await repo.remove(entries);
}
  /**
   * @description Retrieves all cash flow entries of a given type from the database.
   * @param {CashFlowType} type The type of cash flow to retrieve.
   * @returns {Promise<CashFlow[]>} A promise that resolves to an array of CashFlow entities
   * with the given type.
   */
export async function getCashFlowByType(type: CashFlowType) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ type });
}
  /**
   * @description Retrieves all cash flow entries with a given description from the database.
   * @param {string} description The description of cash flow to retrieve.
   * @returns {Promise<CashFlow[]>} A promise that resolves to an array of CashFlow entities
   * with the given description.
   */
export async function getCashFlowByDescription(description: string) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ description });
}
  /**
   * @description Retrieves all cash flow entries that were created on a given date from the database.
   * @param {Date} date The date to retrieve the cash flow entries for.
   * @returns {Promise<CashFlow[]>} A promise that resolves to an array of CashFlow entities
   * that were created on the given date.
   */
export async function getCashFlowByDate(date: Date) {
  const repo = AppDataSource.getRepository(CashFlow);

  return await repo.findBy({ createdAt: date });
}
