"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAirport = createAirport;
exports.getAirports = getAirports;
exports.getAirportById = getAirportById;
exports.updateAirport = updateAirport;
exports.deleteAirport = deleteAirport;
exports.getPlanesByAirportId = getPlanesByAirportId;
exports.getCashFlowsByAirportId = getCashFlowsByAirportId;
exports.getAirportByIdWithPlanesAndCashFlows = getAirportByIdWithPlanesAndCashFlows;
const data_source_1 = require("../database/data-source");
const Airport_1 = require("../entities/Airport");
const Plane_1 = require("../entities/Plane");
const CashFlow_1 = require("../entities/CashFlow");
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
async function createAirport({ nome, cidade, estado, codigoIATA, criadoEm, }) {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
    const airport = repo.create({ nome, cidade, estado, codigoIATA, criadoEm });
    await repo.save(airport);
    return airport;
}
/**
 * @description Retrieves all airports from the database.
 * @returns {Promise<Airport[]>} A promise that resolves to an array of Airport entities.
 * @throws {Error} If there is an issue with the database query.
 */
async function getAirports() {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
    return await repo.find();
}
/**
 * @description Retrieves an airport by its ID from the database.
 * @param {number} id The ID of the airport to retrieve.
 * @returns {Promise<Airport>} A promise that resolves to the Airport entity with the given ID.
 * @throws {Error} If the airport could not be found.
 */
async function getAirportById(id) {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
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
async function updateAirport(id, { nome, cidade, estado, codigoIATA, criadoEm }) {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
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
async function deleteAirport(id) {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
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
async function getPlanesByAirportId(airportId) {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
    return await repo.find({ where: { airportId } });
}
/**
 * @description Retrieves all cash flows belonging to an airport by its ID from the database.
 * @param {number} airportId The ID of the airport to retrieve the cash flows from.
 * @returns {Promise<CashFlow[]>} A promise that resolves to an array of CashFlow entities
 * belonging to the given airport.
 * @throws {Error} If the airport could not be found.
 */
async function getCashFlowsByAirportId(airportId) {
    const repo = data_source_1.AppDataSource.getRepository(CashFlow_1.CashFlow);
    return await repo.find({ where: { airportId } });
}
/**
 * @description Retrieves an airport by its ID from the database, including all planes and cash flows that belong to it.
 * @param {number} id The ID of the airport to retrieve.
 * @returns {Promise<Airport>} A promise that resolves to the Airport entity with the given ID.
 * @throws {Error} If the airport could not be found.
 */
async function getAirportByIdWithPlanesAndCashFlows(id) {
    const repo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
    const airport = await repo.findOneBy({ id });
    if (!airport) {
        throw new Error('Airport not found');
    }
    return await repo.findOne({
        where: { id },
        relations: ['planes', 'cashFlows'],
    });
}
