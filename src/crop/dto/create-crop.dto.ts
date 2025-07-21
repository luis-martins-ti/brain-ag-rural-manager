import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty({ example: 'Soja' })
  @IsString()
  @IsNotEmpty()
  name: string;
}