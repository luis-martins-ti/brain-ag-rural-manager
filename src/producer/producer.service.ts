import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducerService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: any) {
    return this.prisma.producer.create({
      data: {
        ...dto,
        properties: {
          create: dto.properties?.map((prop: any) => ({
            ...prop,
          })) || [],
        },
      },
    });
  }

  findAll() {
    return this.prisma.producer.findMany({
      include: {
        properties: {
          include: {
            harvests: {
              include: {
                crops: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.producer.findUnique({
      where: { id },
      include: {
        properties: {
          include: {
            harvests: {
              include: {
                crops: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: string, dto: any) {
    return this.prisma.producer.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.producer.delete({ where: { id } });
  }
}