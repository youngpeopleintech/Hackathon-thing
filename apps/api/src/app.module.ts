import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './registration/registration.module';
import { EmailModule } from './email/email.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    EmailModule,
    RegistrationModule,
  ],
})
export class AppModule {}

