import * as Brevo from "@getbrevo/brevo";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export interface EmailData {
  to: string;
  name: string;
  registrationId: string;
  hackathonTrack?: string;
  teamSize?: number;
}

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private apiInstance: Brevo.TransactionalEmailsApi;
  private isConfigured = false;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>("BREVO_API_KEY");

    if (!apiKey) {
      this.logger.warn(
        "⚠️ Brevo API key not configured. Email sending will be disabled.",
      );
      return;
    }

    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      apiKey,
    );
    this.isConfigured = true;
    this.logger.log("✅ Brevo email service initialized");
  }

  async sendConfirmationEmail(data: EmailData): Promise<boolean> {
    if (!this.isConfigured) {
      this.logger.log("📧 Email would be sent to:", data.to);
      this.logger.log("📧 Email content:", this.generateEmailHtml(data));
      return true; // Return true for development without API key
    }

    try {
      const sendSmtpEmail = new Brevo.SendSmtpEmail();

      sendSmtpEmail.subject =
        "🎉 Welcome to YPIT: The Artificial Future Hackathon!";
      sendSmtpEmail.htmlContent = this.generateEmailHtml(data);
      sendSmtpEmail.sender = {
        name: "YPIT Team",
        email:
          this.configService.get<string>("SENDER_EMAIL") || "hello@ypit.org",
      };
      sendSmtpEmail.to = [{ email: data.to, name: data.name }];

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      this.logger.log(`✅ Confirmation email sent to ${data.to}`);
      return true;
    } catch (error) {
      this.logger.error("❌ Failed to send email:", error);
      return false;
    }
  }

  private generateEmailHtml(data: EmailData): string {
    const templatePath = path.join(
      process.cwd(),
      "src/email/templates/artificial-future-hackathon.html",
    );
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);

    return template(data);
  }
}
