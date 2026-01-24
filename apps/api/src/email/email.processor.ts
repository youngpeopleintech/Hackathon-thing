import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { JobName, QueueName } from "../common/constants";
import { SupabaseService } from "../supabase/supabase.service";
import { EmailData, EmailService } from "./email.service";

@Processor(QueueName.EMAIL)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly supabaseService: SupabaseService,
  ) {
    super();
  }

  async process(job: Job<EmailData>): Promise<void> {
    switch (job.name) {
      case JobName.SEND_CONFIRMATION:
        await this.handleSendConfirmation(job.data);
        break;
      default:
        this.logger.error(`Unknown job name: ${job.name}`);
        break;
    }
  }

  private async handleSendConfirmation(data: EmailData): Promise<void> {
    this.logger.log(
      `Processing email job for registration: ${data.registrationId}`,
    );

    const emailSent = await this.emailService.sendConfirmationEmail(data);

    if (emailSent) {
      const supabase = this.supabaseService.getClient();
      const { error } = await supabase
        .from("registrations")
        .update({ confirmation_sent: true })
        .eq("id", data.registrationId);

      if (error) {
        this.logger.error(
          `Failed to update confirmation status for registration ${data.registrationId}: ${error.message}`,
        );
      } else {
        this.logger.log(
          `Successfully updated confirmation status for registration ${data.registrationId}`,
        );
      }
    } else {
      this.logger.error(
        `Failed to send confirmation email for registration ${data.registrationId}`,
      );
      throw new Error(
        `Failed to send confirmation email for registration ${data.registrationId}`,
      );
    }
  }
}
