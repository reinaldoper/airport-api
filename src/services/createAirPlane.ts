import { AppDataSource } from '../database/data-source';

import { Plane } from '../entities/Plane';

interface CreatePlaneParams {
  modelo: string;
  anoFabricacao: number;
  capacidade: number;
  valorCompra: number;
  createdAt: Date;
}
export async function createPlane({ modelo, anoFabricacao, capacidade, valorCompra, createdAt }: CreatePlaneParams) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = repo.create({ modelo, anoFabricacao, capacidade, valorCompra, createdAt });
  return await repo.save(entry);
}
export async function getPlanes() {
  const repo = AppDataSource.getRepository(Plane);

  return await repo.find();
}
export async function getPlaneById(id: number) {
  const repo = AppDataSource.getRepository(Plane);

  return await repo.findOneBy({ id });
}
export async function updatePlane(id: number, { modelo, anoFabricacao, capacidade, valorCompra, createdAt }: CreatePlaneParams) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('Plane not found');
  }
  entry.modelo = modelo;
  entry.anoFabricacao = anoFabricacao;
  entry.capacidade = capacidade;
  entry.valorCompra = valorCompra;
  entry.createdAt = createdAt;
  return await repo.save(entry);
}

export async function deletePlane(id: number) {
  const repo = AppDataSource.getRepository(Plane);

  const entry = await repo.findOneBy({ id });
  if (!entry) {
    throw new Error('Plane not found');
  }
  return await repo.remove(entry);
}