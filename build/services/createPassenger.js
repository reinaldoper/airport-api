"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPassenger = createPassenger;
exports.getAllPassengers = getAllPassengers;
exports.getPassengerById = getPassengerById;
exports.updatePassenger = updatePassenger;
exports.deletePassenger = deletePassenger;
const data_source_1 = require("../database/data-source");
const Passenger_1 = require("../entities/Passenger");
const passengerRepo = data_source_1.AppDataSource.getRepository(Passenger_1.Passenger);
/**
 * Creates a new passenger with the provided data.
 * @param nome The name of the passenger.
 * @param documentoIdentidade The document of identification of the passenger.
 * @param email The email of the passenger.
 * @returns A promise resolving to the newly created passenger.
 */
async function createPassenger({ nome, documentoIdentidade, email, planeId }) {
    const passenger = passengerRepo.create({
        nome,
        documentoIdentidade,
        email,
        planeId
    });
    const createdPassenger = await passengerRepo.save(passenger);
    return createdPassenger;
}
/**
 * Retrieves all passengers.
 * @returns A promise resolving to an array of Passenger objects.
 */
async function getAllPassengers() {
    const passengers = await passengerRepo.find();
    return passengers;
}
/**
 * Retrieves a passenger by its id.
 * @param id The id of the passenger.
 * @throws {Error} If no passenger is found with the given id.
 * @returns A promise resolving to the passenger object if found.
 */
async function getPassengerById(id) {
    const passenger = await passengerRepo.findOneBy({ id });
    if (!passenger) {
        throw new Error('Passageiro não encontrado');
    }
    return passenger;
}
/**
 * Updates a passenger with the given id with new data.
 * @param id The id of the passenger to be updated.
 * @param data The new data for the passenger.
 * @returns A promise resolving to the updated passenger.
 * @throws {Error} If no passenger is found with the given id.
 */
async function updatePassenger(id, { nome, documentoIdentidade, email, planeId }) {
    const passenger = await getPassengerById(id);
    if (!passenger) {
        throw new Error('Passageiro não encontrado');
    }
    passenger.nome = nome;
    passenger.documentoIdentidade = documentoIdentidade;
    passenger.email = email;
    passenger.planeId = planeId;
    const updatedPassenger = await passengerRepo.save(passenger);
    return updatedPassenger;
}
/**
 * Deletes a passenger by its id.
 * @param id The id of the passenger to be deleted.
 * @throws {Error} If no passenger is found with the given id.
 * @returns A promise resolving to an object with a success message.
 */
async function deletePassenger(id) {
    const passenger = await getPassengerById(id);
    if (!passenger) {
        throw new Error('Passageiro não encontrado');
    }
    await passengerRepo.remove(passenger);
    return { message: 'Passageiro deletado com sucesso' };
}
