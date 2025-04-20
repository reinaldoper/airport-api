"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlane = createPlane;
exports.getPlanes = getPlanes;
exports.getPlaneById = getPlaneById;
exports.updatePlane = updatePlane;
exports.deletePlane = deletePlane;
const data_source_1 = require("../database/data-source");
const Plane_1 = require("../entities/Plane");
async function createPlane({ modelo, anoFabricacao, capacidade, valorCompra, createdAt }) {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
    const entry = repo.create({ modelo, anoFabricacao, capacidade, valorCompra, createdAt });
    return await repo.save(entry);
}
async function getPlanes() {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
    return await repo.find();
}
async function getPlaneById(id) {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
    return await repo.findOneBy({ id });
}
async function updatePlane(id, { modelo, anoFabricacao, capacidade, valorCompra, createdAt }) {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
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
async function deletePlane(id) {
    const repo = data_source_1.AppDataSource.getRepository(Plane_1.Plane);
    const entry = await repo.findOneBy({ id });
    if (!entry) {
        throw new Error('Plane not found');
    }
    return await repo.remove(entry);
}
