import { AppDataSource } from '../database/data-source';
import { Airport } from '../entities/Airport';
import { Plane } from '../entities/Plane';
import { CashFlow } from '../entities/CashFlow';


export interface CreateAirportParams {
  nome: string;
  cidade: string;
  estado: string;
  codigoIATA: string;
  criadoEm: Date;
}

/**
 * Cria um novo aeroporto
 * @param nome Nome do aeroporto
 * @param cidade Cidade do aeroporto
 * @param estado Estado do aeroporto
 * @param codigoIATA C digo IATA do aeroporto
 * @param criadoEm Data de cria o do aeroporto
 * @returns Aeroporto criado
 * @throws Error 400 se o aeroporto j  existe com o mesmo c digo IATA
 * @throws Error 500 caso ocorra um erro ao criar o aeroporto
 */
export async function createAirport({
  nome,
  cidade,
  estado,
  codigoIATA,
  criadoEm,
}: CreateAirportParams) {
  const repo = AppDataSource.getRepository(Airport);
  const airport = repo.create({ nome, cidade, estado, codigoIATA, criadoEm });
  await repo.save(airport);
  return airport;
}   

/**
 * @description Retrieves all airports from the database.
 * @returns {Promise<Airport[]>} A promise that resolves to an array of Airport entities.
 * @throws {Error} If there is an issue with the database query.
 */

export async function getAirports() {
  const repo = AppDataSource.getRepository(Airport);
  return await repo.find();
}
/**
 * @description Retrieves an airport by its ID from the database.
 * @param {number} id The ID of the airport to retrieve.
 * @returns {Promise<Airport>} A promise that resolves to the Airport entity with the given ID.
 * @throws {Error} If the airport could not be found.
 */
export async function getAirportById(id: number) {
  const repo = AppDataSource.getRepository(Airport);
  const airport = await repo.findOneBy({ id });
  if (!airport) {
    throw new Error('Airport not found');
  }
  return airport;
}
/**
 * @description Updates an existing airport in the database.
 * @param {number} id The ID of the airport to update.
 * @param {{ nome: string, cidade: string, estado: string, codigoIATA: string, criadoEm: Date }} params The parameters to
 * update.
 * @returns {Promise<Airport>} A promise that resolves to the updated Airport entity.
 * @throws {Error} If the airport could not be found.
 * @throws {Error} If there is already an airport with the same IATA code.
 */
export async function updateAirport(id: number, { nome, cidade, estado, codigoIATA, criadoEm }: CreateAirportParams) {
  const repo = AppDataSource.getRepository(Airport);
  
  const airportExists = await repo.findOneBy({ codigoIATA });
  if (airportExists) {
    throw new Error('Aeroporto já existe com esse código IATA');
  }
  const airport = await repo.findOneBy({ id });
  if (!airport) {
    throw new Error('Airport not found');
  }
  airport.nome = nome;
  airport.cidade = cidade;
  airport.estado = estado;
  airport.codigoIATA = codigoIATA;
  airport.criadoEm = criadoEm;
  return await repo.save(airport);
} 
/**
 * @description Deletes an airport by its ID from the database.
 * @param {number} id The ID of the airport to delete.
 * @returns {Promise<Airport>} A promise that resolves to the deleted Airport entity.
 * @throws {Error} If the airport could not be found.
 */

export async function deleteAirport(id: number) {
  const repo = AppDataSource.getRepository(Airport);
  const airport = await repo.findOneBy({ id });
  if (!airport) {
    throw new Error('Airport not found');
  }
  return await repo.remove(airport);
}
/**
 * @description Retrieves all planes belonging to an airport by its ID from the database.
 * @param {number} airportId The ID of the airport to retrieve the planes from.
 * @returns {Promise<Plane[]>} A promise that resolves to an array of Plane entities
 * belonging to the given airport.
 * @throws {Error} If the airport could not be found.
 */
export async function getPlanesByAirportId(airportId: number) {
  const repo = AppDataSource.getRepository(Plane);
  return await repo.find({ where: { airportId } });
}
/**
 * @description Retrieves all cash flows belonging to an airport by its ID from the database.
 * @param {number} airportId The ID of the airport to retrieve the cash flows from.
 * @returns {Promise<CashFlow[]>} A promise that resolves to an array of CashFlow entities
 * belonging to the given airport.
 * @throws {Error} If the airport could not be found.
 */
export async function getCashFlowsByAirportId(airportId: number) {
  const repo = AppDataSource.getRepository(CashFlow);
  return await repo.find({ where: { airportId } });
}
/**
 * @description Retrieves an airport by its ID from the database, including all planes and cash flows that belong to it.
 * @param {number} id The ID of the airport to retrieve.
 * @returns {Promise<Airport>} A promise that resolves to the Airport entity with the given ID.
 * @throws {Error} If the airport could not be found.
 */
export async function getAirportByIdWithPlanesAndCashFlows(id: number) {
  const repo = AppDataSource.getRepository(Airport);
  const airport = await repo.findOneBy({ id });
  if (!airport) {
    throw new Error('Airport not found');
  }
  return await repo.findOne({
    where: { id },
    relations: ['planes', 'cashFlows'],
  });
}