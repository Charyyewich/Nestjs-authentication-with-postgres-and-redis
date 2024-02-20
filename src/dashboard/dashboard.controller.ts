import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { StatsResponseDto } from './dashboard.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';



@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,

  ) {}

  @Get()
  @Roles(Role.Admin)
  async getStats(): Promise<StatsResponseDto> {
    return await this.dashboardService.getStats();
  }
}

  
