import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CropService {
  constructor(private prisma: PrismaService) { }

  create(harvestId: string, dto: any) {
    return this.prisma.crop.create({
      data: {
        ...dto,
        harvestId,
      },
    });
  }

  update(id: string, dto: any) {
    return this.prisma.crop.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.crop.delete({ where: { id } });
  }
}
