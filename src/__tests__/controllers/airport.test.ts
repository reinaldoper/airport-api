import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../../database/data-source'; 
import airportRoutes from '../../routes/airportRoutes';
import { Airport } from '../../entities/Airport';


const airportRepository = AppDataSource.getRepository(Airport);

const app = express();
app.use(express.json());
app.use('/api', airportRoutes); 

beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.synchronize();
});

describe('Airport Controller', () => {
    test('deve criar um aeroporto', async () => {
        const response = await request(app)
            .post('/api/airports')
            .send({ nome: 'Aeroporto Teste', cidade: 'Cidade Teste', estado: 'Estado Teste', codigoIATA: 'TST' });

        expect(response.status).toBe(201);
        expect(response.body.data.nome).toBe('Aeroporto Teste');

        const airportId = response.body.data.id;

        const updateResponse = await request(app)
            .put(`/api/airports/${airportId}`)
            .send({ nome: 'Aeroporto Atualizado', cidade: 'Cidade Atualizada', estado: 'Estado Atualizado', codigoIATA: 'UPD' });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.message).toBe('Aeroporto atualizado com sucesso');

        const deleteResponse = await request(app)
            .delete(`/api/airports/${airportId}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe('Aeroporto deletado com sucesso');
    });

    test('deve listar todos os aeroportos', async () => {
        const response = await request(app).get('/api/airports');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});

afterAll(async () => {
    await airportRepository.clear();
    await AppDataSource.destroy();
});
