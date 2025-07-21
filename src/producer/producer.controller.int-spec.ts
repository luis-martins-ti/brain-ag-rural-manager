import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('ProducerController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const mockPrisma = {
    producer: {
      create: jest.fn().mockResolvedValue({ id: '1', name: 'João', cpfCnpj: '12345678901' }),
      update: jest.fn().mockResolvedValue({ id: '1', name: 'João Alterado' }),
      delete: jest.fn().mockResolvedValue({ id: '1' }),
      findUnique: jest.fn().mockResolvedValue({ id: '1', name: 'João', cpfCnpj: '12345678901', properties: [] }),
      findMany: jest.fn().mockResolvedValue([{ id: '1', name: 'João', cpfCnpj: '12345678901', properties: [] }]),
    },
    property: {
      create: jest.fn().mockImplementation((data) => {
        const sum = data.agriculturalArea + data.vegetationArea;
        if (sum > data.totalArea) {
          throw new Error('A soma das áreas não pode ser maior que a área total');
        }
        return Promise.resolve({ ...data, id: '1' });
      }),
    },
    crop: {
      create: jest.fn().mockResolvedValue({ id: '1', name: 'Soja' }),
    },
    dashboard: {
      getSummary: jest.fn().mockResolvedValue({
        totalProperties: 3,
        totalHectares: 100,
        landUsage: { agriculturalArea: 60, vegetationArea: 40 },
        propertiesByState: [{ state: 'MG', count: 2 }],
        cropsByName: [{ name: 'Soja', count: 2 }],
      }),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers (POST)', () => {
    return request(app.getHttpServer())
      .post('/producers')
      .send({ name: 'João', cpfCnpj: '12345678901' })
      .expect(201)
      .expect({ id: '1', name: 'João', cpfCnpj: '12345678901' });
  });

  it('/producers/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/producers/1')
      .send({ name: 'João Alterado' })
      .expect(200)
      .expect({ id: '1', name: 'João Alterado' });
  });

  it('/producers/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/producers/1')
      .expect(200)
      .expect({ id: '1' });
  });

  it('/properties (POST) - regra da área inválida', () => {
    return request(app.getHttpServer())
      .post('/properties')
      .send({
        name: 'Fazenda XPTO',
        city: 'Patos',
        state: 'MG',
        totalArea: 100,
        agriculturalArea: 70,
        vegetationArea: 40,
        producerId: '1'
      })
      .expect(500)
      .expect((res) => {
        expect(res.body.message).toContain('A soma das áreas não pode ser maior que a área total');
      });
  });

  it('/dashboard (GET)', () => {
    return request(app.getHttpServer())
      .get('/dashboard')
      .expect(200)
      .expect({
        totalProperties: 3,
        totalHectares: 100,
        landUsage: { agriculturalArea: 60, vegetationArea: 40 },
        propertiesByState: [{ state: 'MG', count: 2 }],
        cropsByName: [{ name: 'Soja', count: 2 }],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});