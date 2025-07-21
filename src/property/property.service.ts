import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) { }

  create(dto: any) {
    const {
      totalArea = 0,
      agriculturalArea = 0,
      vegetationArea = 0,
    } = dto;

    const soma = agriculturalArea + vegetationArea;

    if (soma > totalArea) {
      throw new BadRequestException(
        'A soma das áreas não pode ser maior que a área total',
      );
    }

    return this.prisma.property.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.property.update({ where: { id }, data: dto });
  }

  findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
      include: { harvests: { include: { crops: true } } },
    });
  }

  remove(id: string) {
    return this.prisma.property.delete({ where: { id } });
  }
}