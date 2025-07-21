import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { PropertyModule } from './property/property.module';
import { HarvestModule } from './harvest/harvest.module';
import { CropModule } from './crop/crop.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ProducerModule,
    PropertyModule,
    HarvestModule,
    CropModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
