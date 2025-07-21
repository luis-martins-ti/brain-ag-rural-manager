import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.propertyService.update(id, dto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get property by id' })
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Property removed successfully' })
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}