import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from './harvest.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HarvestService', () => {
  let service: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvestService, {
        provide: PrismaService,
        useValue: {
          harvest: {
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Safra 2022' }),
          },
        },
      }],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a harvest', async () => {
    const dto = { name: 'Safra 2022' };
    const result = await service.create('propertyId', dto);
    expect(result).toEqual(expect.objectContaining(dto));
  });
});