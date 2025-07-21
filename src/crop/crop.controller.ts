import { Controller, Post, Put, Get, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@ApiTags('Crops')
@Controller('harvests/:harvestId/crops')
export class CropController {
  constructor(private readonly cropService: CropService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Crop created successfully' })
  create(@Param('harvestId') harvestId: string, @Body() dto: CreateCropDto) {
    return this.cropService.create(harvestId, dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Crop updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.cropService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Crop removed successfully' })
  remove(@Param('id') id: string) {
    return this.cropService.remove(id);
  }
}