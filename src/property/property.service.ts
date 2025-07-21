import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) { }

  create(dto: any) {
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