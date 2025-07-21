import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  @ApiOkResponse({
    description: 'Resumo do sistema com dados agregados para o dashboard',
  })
  getSummary() {
    return this.dashboardService.getSummary();
  }
}
