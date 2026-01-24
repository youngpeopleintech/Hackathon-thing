import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { API_QUEUE_PREFIX } from "./common/constants";
import { EmailModule } from "./email/email.module";
import { RegistrationModule } from "./registration/registration.module";
import { SupabaseModule } from "./supabase/supabase.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          url: configService.get("REDIS_URL") || "redis://localhost:6379",
        },
        prefix: API_QUEUE_PREFIX,
      }),
      inject: [ConfigService],
    }),
    SupabaseModule,
    EmailModule,
    RegistrationModule,
  ],
})
export class AppModule {}
