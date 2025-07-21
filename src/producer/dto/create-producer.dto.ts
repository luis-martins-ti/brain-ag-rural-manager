import { IsString, IsNotEmpty, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePropertyDto } from '../../property/dto/create-property.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({ example: '12345678901' })
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [CreatePropertyDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyDto)
  properties?: CreatePropertyDto[];
}