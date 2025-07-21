import { Test, TestingModule } from '@nestjs/testing';
import { CropService } from './crop.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CropService', () => {
  let service: CropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropService, {
        provide: PrismaService,
        useValue: {
          crop: {
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Soja' }),
          },
        },
      }],
    }).compile();

    service = module.get<CropService>(CropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a crop', async () => {
    const dto = { name: 'Soja' };
    const result = await service.create('harvestId', dto);
    expect(result).toEqual(expect.objectContaining(dto));
  });
});