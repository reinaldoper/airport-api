import express from 'express';
import { AppDataSource } from '../../database/data-source'; 
import cashFlowRoutes from '../../routes/cashFlowRoutes';
import request from 'supertest';
import { Plane } from '../../entities/Plane';
import { Airport } from '../../entities/Airport';

const app = express();
app.use(express.json());
app.use('/api', cashFlowRoutes);

const planeRepository = AppDataSource.getRepository(Plane);
  const airportRepository = AppDataSource.getRepository(Airport);

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize();

  const plane = planeRepository.create({
    modelo: 'Boeing 747',
    anoFabricacao: 2000,
    capacidade: 200,
    valorCompra: 100000,

  });
  await planeRepository.save(plane);

  const airport = airportRepository.create({
    nome: 'Aeroporto Internacional de Santos Dumont',
    cidade: 'Santos Dumont',
    estado: 'SP',
    codigoIATA: 'SDU',
    criadoEm: new Date(),

  });
  await airportRepository.save(airport);
});


describe('CashFlow Controller', () => {
  it('Deve criar um novo fluxo de caixa', async () => {
    const plane = await planeRepository.findOneBy({ id: 1 });
    const airport = await airportRepository.findOneBy({ id: 1 });

    expect(plane).not.toBeNull();
    expect(airport).not.toBeNull();
    const response = await request(app)
      .post('/api/cashflow')
      .send({
        description: 'Venda de passagens',
        amount: 5000,
        type: 'income',
        planeId: 1,
        airportId: 1
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Fluxo de caixa criado com sucesso'); 
  });

  it('Deve validar o body e retornar erro 400', async () => {
    const response = await request(app)
      .post('/api/cashflow')
      .send({
        amount: 'não é um número',
        type: 'outcome',
        planeId: 1,
        airportId: 1
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});

afterAll(async () => {
  await airportRepository.clear();
  await AppDataSource.dropDatabase();
});