import { Flight, FlightStatus } from '../entities/Flight';
import { Airport } from '../entities/Airport';
import { Plane } from '../entities/Plane';
import { AppDataSource } from '../database/data-source';

const flightRepo = AppDataSource.getRepository(Flight);
const airportRepo = AppDataSource.getRepository(Airport);
const planeRepo = AppDataSource.getRepository(Plane);

export interface FlightData {
  origem: number;
  destino: number;
  dataHoraPartida: string;
  dataHoraChegada: string;
  status: FlightStatus;
  plane: number;
}

/**
 * Retrieves all flights.
 * @returns A promise resolving to an array of Flight objects,
 *  with their origem, destino and plane relations loaded.
 */
export const getAllFlights = async () => {
  return await flightRepo.find({
    relations: ['origem', 'destino', 'plane'],
  });
};

/**
 * Creates a new flight with the provided data.
 * @param origem The ID of the origin airport.
 * @param destino The ID of the destination airport.
 * @param dataHoraPartida The departure date and time in string format.
 * @param dataHoraChegada The arrival date and time in string format.
 * @param status The status of the flight.
 * @param plane The ID of the plane.
 * @returns A promise resolving to the newly created flight.
 * @throws {Error} If any of the origem, destino, or plane IDs are invalid.
 */

export async function createFlight({ origem, destino, dataHoraPartida, dataHoraChegada, status, plane }: FlightData) {
  const origemEntity = await airportRepo.findOneBy({ id: origem });
  const destinoEntity = await airportRepo.findOneBy({ id: destino });
  const planeEntity = await planeRepo.findOneBy({ id: plane });

  if (!origemEntity || !destinoEntity || !planeEntity) {
    throw new Error('Origem, destino ou avião inválido');
  }
  const newFlight = flightRepo.create({
    origem: origemEntity,
    destino: destinoEntity,
    dataHoraPartida: new Date(dataHoraPartida),
    dataHoraChegada: new Date(dataHoraChegada),
    status: status,
    plane: planeEntity,
  });
  return await flightRepo.save(newFlight);
}

/**
 * Retrieves a flight by its id.
 * @param id The id of the flight.
 * @throws {Error} If no flight is found with the given id.
 * @returns {Promise<Flight | null>} A promise resolving to the flight object if found, or null.
 */
export const getFlightById = async (id: number) => {
  const flight = await flightRepo.findOne({
    where: { id },
    relations: ['origem', 'destino', 'plane'],
  });

  if (!flight) throw new Error('Voo não encontrado');

  return flight;
};
  /**
   * Updates a flight with given id with new data.
   * @param id id of the flight to be updated
   * @param data new data for the flight
   * @returns updated flight
   * @throws {Error} if flight with given id is not found or if origem, destino or plane is invalid
   */
export const updateFlight = async (id: number, { origem, destino, dataHoraPartida, dataHoraChegada, status, plane }: FlightData) => {
  const flight = await getFlightById(id);

  if (!flight) throw new Error('Voo não encontrado');

  const origemEntity = await airportRepo.findOneBy({ id: origem });
  const destinoEntity = await airportRepo.findOneBy({ id: destino });
  const planeEntity = await planeRepo.findOneBy({ id: plane });

  if (!origemEntity || !destinoEntity || !planeEntity) {
    throw new Error('Origem, destino ou avião inválido');
  }

  flight.origem = origemEntity;
  flight.destino = destinoEntity;
  flight.dataHoraPartida = new Date(dataHoraPartida);
  flight.dataHoraChegada = new Date(dataHoraChegada);
  flight.status = status;
  flight.plane = planeEntity;

  return await flightRepo.save(flight);
};

/**
 * Deletes a flight by its ID.
 * @param id The ID of the flight to be deleted.
 * @throws {Error} If the flight is not found.
 * @returns {Promise<object>} A promise resolving to an object containing a success message.
 */

export const deleteFlight = async (id: number) => {
  const flight = await flightRepo.findOneBy({ id });

  if (!flight) throw new Error('Voo não encontrado');

  await flightRepo.remove(flight);
  return { message: 'Voo excluído com sucesso' };
};
  /**
   * Retrieves all flights of a given plane.
   * @param planeId The id of the plane.
   * @throws {Error} If no flights are found for the given plane.
   * @returns {Promise<Flight[]>} A promise resolving to an array of Flight objects.
   */
export const getFlightByPlaneId = async (planeId: number) => {
  const flights = await flightRepo.find({
    where: { plane: { id: planeId } },
    relations: ['origem', 'destino', 'plane'],
  });

  if (!flights || flights.length === 0) throw new Error('Nenhum voo encontrado para este avião');

  return flights;
}
  /**
   * Retrieves all flights departing from a given airport.
   * @param airportId The id of the airport.
   * @throws {Error} If no flights are found for the given airport.
   * @returns {Promise<Flight[]>} A promise resolving to an array of Flight objects.
   */
export const getFlightByAirportId = async (airportId: number) => {
  const flights = await flightRepo.find({
    where: { origem: { id: airportId } },
    relations: ['origem', 'destino', 'plane'],
  });

  if (!flights || flights.length === 0) throw new Error('Nenhum voo encontrado para este aeroporto');

  return flights;
}