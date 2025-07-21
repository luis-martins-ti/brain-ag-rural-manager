import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Fazenda Boa Esperança' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Uberlândia' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'MG' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(0)
  vegetationArea: number;
}
