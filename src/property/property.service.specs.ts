import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyService, {
        provide: PrismaService,
        useValue: {
          property: {
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Test Property' }),
          },
        },
      }],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a property', async () => {
    const dto = { name: 'Test Property', city: 'City', state: 'ST', totalArea: 100, agriculturalArea: 50, vegetationArea: 40 };
    const result = await service.create(dto);
    expect(result).toEqual(expect.objectContaining(dto));
  });
});