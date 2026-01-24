import { BullModule } from "@nestjs/bullmq";
import { Global, Module } from "@nestjs/common";
import { QueueName } from "../common/constants";
import { SupabaseModule } from "../supabase/supabase.module";
import { EmailProcessor } from "./email.processor";
import { EmailService } from "./email.service";

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.EMAIL,
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 5000,
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      },
    }),
    SupabaseModule,
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService, BullModule],
})
export class EmailModule {}
