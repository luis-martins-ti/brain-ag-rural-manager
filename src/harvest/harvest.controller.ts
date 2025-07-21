import { Controller, Post, Put, Get, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@ApiTags('Harvests')
@Controller('properties/:propertyId/harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Harvest created successfully' })
  create(@Param('propertyId') propertyId: string, @Body() dto: CreateHarvestDto) {
    return this.harvestService.create(propertyId, dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Harvest updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateHarvestDto) {
    return this.harvestService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Harvest removed successfully' })
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id);
  }
}