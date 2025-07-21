import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProducerService', () => {
  let service: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerService, {
        provide: PrismaService,
        useValue: {
          producer: {
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Test', cpfCnpj: '12345678901' })
          },
        },
      }],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a producer', async () => {
    const dto = { name: 'Test', cpfCnpj: '12345678901' };
    const result = await service.create(dto);
    expect(result).toEqual(expect.objectContaining(dto));
  });
});