import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HarvestService {
  constructor(private prisma: PrismaService) { }

  create(propertyId: string, dto: any) {
    return this.prisma.harvest.create({
      data: {
        ...dto,
        propertyId,
      },
    });
  }

  update(id: string, dto: any) {
    return this.prisma.harvest.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.harvest.delete({ where: { id } });
  }
}