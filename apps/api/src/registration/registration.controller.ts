import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.createRegistration(createRegistrationDto);
  }

  @Get('stats')
  async getStats() {
    return this.registrationService.getRegistrationStats();
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}

