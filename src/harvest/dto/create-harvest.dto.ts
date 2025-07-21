import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty({ example: 'Safra 2022' })
  @IsString()
  @IsNotEmpty()
  name: string;
}