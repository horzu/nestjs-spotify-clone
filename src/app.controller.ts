import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('Authentication')
  getHello(): string {
    return this.appService.getHello();
  }
}
