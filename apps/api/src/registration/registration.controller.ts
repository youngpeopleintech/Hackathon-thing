import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { CreateRegistrationDto } from "./registration.dto";
import { RegistrationService } from "./registration.service";

@Controller("registration")
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.createRegistration(createRegistrationDto);
  }

  @Get("stats")
  async getStats() {
    return this.registrationService.getRegistrationStats();
  }

  @Get("health")
  healthCheck() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
