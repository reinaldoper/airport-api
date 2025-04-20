import { AppDataSource } from '../database/data-source';

import { Plane } from '../entities/Plane';

export interface CreatePlaneParams {
  modelo: string;
  anoFabricacao: number;
  capacidade: number;
  valorCompra: number;
}
/**
 * Creates a new plane in the database.
 * @param {CreatePlaneParams} param0 - Object containing the attributes of the plane to create.
 * @param {string} param0.modelo - The model of the plane to create.
 * @param {number} param0.anoFabricacao - The manufacturing year of the plane to create.
 * @param {number} param0.capacidade - The capacity of the plane to create.
 * @param {number} param0.valorCompra - The purchase value of the plane to create.
 * @returns {Promise<Plane>} A promise that resolves to the newly created Plane entity.
 */
export async function createPlane({ modelo, anoFabricacao, capacidade, valorCompra }: CreatePlaneParams) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = repo.create({ modelo, anoFabricacao, capacidade, valorCompra });
  return await repo.save(entry);
}
/**
 * Retrieves all planes from the database.
 * @returns {Promise<Plane[]>} A promise that resolves to an array of Plane entities.
 */
export async function getPlanes() {
  const repo = AppDataSource.getRepository(Plane);

  return await repo.find();
}
/**
 * Retrieves a plane by its ID from the database.
 * @param {number} id - The ID of the plane to retrieve.
 * @returns {Promise<Plane | null>} A promise that resolves to the plane with the given ID, or null if it is not found.
 */
export async function getPlaneById(id: number) {
  const repo = AppDataSource.getRepository(Plane);

  return await repo.findOneBy({ id });
}
/**
 * Updates an existing plane in the database with the provided details.
 * @param {number} id - The ID of the plane to update.
 * @param {CreatePlaneParams} param1 - Object containing the new attributes of the plane.
 * @param {string} param1.modelo - The new model of the plane.
 * @param {number} param1.anoFabricacao - The new manufacturing year of the plane.
 * @param {number} param1.capacidade - The new capacity of the plane.
 * @param {number} param1.valorCompra - The new purchase value of the plane.
 * @returns {Promise<Plane>} A promise that resolves to the updated plane.
 * @throws {Error} If the plane with the specified ID is not found.
 */

/**
 * Updates an existing plane in the database with the provided details.
 * @param {number} id - The ID of the plane to update.
 * @param {CreatePlaneParams} param1 - Object containing the new attributes of the plane.
 * @param {string} param1.modelo - The new model of the plane.
 * @param {number} param1.anoFabricacao - The new manufacturing year of the plane.
 * @param {number} param1.capacidade - The new capacity of the plane.
 * @param {number} param1.valorCompra - The new purchase value of the plane.
 * @returns {Promise<Plane>} A promise that resolves to the updated plane.
 * @throws {Error} If the plane with the specified ID is not found.
 */

export async function updatePlane(id: number, { modelo, anoFabricacao, capacidade, valorCompra }: CreatePlaneParams) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('Plane not found');
  }
  entry.modelo = modelo;
  entry.anoFabricacao = anoFabricacao;
  entry.capacidade = capacidade;
  entry.valorCompra = valorCompra;
  return await repo.save(entry);
}

/**
 * Deletes a plane from the database by its ID.
 * @param {number} id - The ID of the plane to be deleted.
 * @returns {Promise<Plane>} - A promise that resolves to the deleted Plane entity.
 * @throws {Error} - Throws an error if the plane is not found.
 */

export async function deletePlane(id: number) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('Plane not found');
  }
  return await repo.remove(entry);
}