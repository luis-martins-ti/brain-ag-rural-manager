import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@ApiTags('Producers')
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Producer created successfully' })
  create(@Body() dto: CreateProducerDto) {
    return this.producerService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all producers' })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a producer by id' })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updates a producer by id' })
  update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
    return this.producerService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Removes a producer by id' })
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }
}