import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let prisma: PrismaService;

  const mockPrisma = {
    property: {
      count: jest.fn().mockResolvedValue(3),
      aggregate: jest.fn().mockImplementation(({ _sum }) => {
        if (_sum.totalArea) {
          return Promise.resolve({ _sum: { totalArea: 300 } });
        }
        if (_sum.agriculturalArea && _sum.vegetationArea) {
          return Promise.resolve({ _sum: { agriculturalArea: 180, vegetationArea: 90 } });
        }
      }),
      groupBy: jest.fn().mockResolvedValue([
        { state: 'SP', _count: { _all: 2 } },
        { state: 'MG', _count: { _all: 1 } },
      ]),
    },
    crop: {
      groupBy: jest.fn().mockResolvedValue([
        { name: 'Soja', _count: { _all: 2 } },
        { name: 'Milho', _count: { _all: 1 } },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return dashboard summary correctly', async () => {
    const summary = await service.getSummary();

    expect(summary.totalProperties).toBe(3);
    expect(summary.totalHectares).toBe(300);
    expect(summary.landUsage).toEqual({
      agriculturalArea: 180,
      vegetationArea: 90,
    });
    expect(summary.propertiesByState).toEqual([
      { state: 'SP', count: 2 },
      { state: 'MG', count: 1 },
    ]);
    expect(summary.cropsByName).toEqual([
      { name: 'Soja', count: 2 },
      { name: 'Milho', count: 1 },
    ]);
  });
});