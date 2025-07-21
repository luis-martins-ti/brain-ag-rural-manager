import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) { }

  async getSummary() {
    // Total de propriedades (fazendas)
    const totalProperties = await this.prisma.property.count();

    // Soma total de hectares registrados (totalArea)
    const totalAreaResult = await this.prisma.property.aggregate({
      _sum: { totalArea: true },
    });

    // Uso do solo: somas de agriculturalArea e vegetationArea
    const landUsage = await this.prisma.property.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });

    // Gráfico por estado (quantidade de propriedades por estado)
    const propertiesByState = await this.prisma.property.groupBy({
      by: ['state'],
      _count: { _all: true },
    });

    // Gráfico por cultura plantada (quantidade por nome)
    const cropsByName = await this.prisma.crop.groupBy({
      by: ['name'],
      _count: { _all: true },
    });

    return {
      totalProperties,
      totalHectares: totalAreaResult._sum.totalArea ?? 0,
      landUsage: {
        agriculturalArea: landUsage._sum.agriculturalArea ?? 0,
        vegetationArea: landUsage._sum.vegetationArea ?? 0,
      },
      propertiesByState: propertiesByState.map(p => ({
        state: p.state,
        count: p._count._all,
      })),
      cropsByName: cropsByName.map(c => ({
        name: c.name,
        count: c._count._all,
      })),
    };
  }
}
