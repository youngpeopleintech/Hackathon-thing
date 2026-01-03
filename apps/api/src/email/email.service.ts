import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Brevo from '@getbrevo/brevo';

interface EmailData {
  to: string;
  name: string;
  registrationId: string;
  hackathonTrack: string;
  teamSize: number;
}

@Injectable()
export class EmailService implements OnModuleInit {
  private apiInstance: Brevo.TransactionalEmailsApi;
  private isConfigured = false;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');

    if (!apiKey) {
      console.warn('⚠️ Brevo API key not configured. Email sending will be disabled.');
      return;
    }

    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    this.isConfigured = true;
    console.log('✅ Brevo email service initialized');
  }

  async sendConfirmationEmail(data: EmailData): Promise<boolean> {
    if (!this.isConfigured) {
      console.log('📧 Email would be sent to:', data.to);
      console.log('📧 Email content:', this.generateEmailHtml(data));
      return true; // Return true for development without API key
    }

    try {
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      
      sendSmtpEmail.subject = '🎉 Welcome to YPIT: The Artificial Future Hackathon!';
      sendSmtpEmail.htmlContent = this.generateEmailHtml(data);
      sendSmtpEmail.sender = {
        name: 'YPIT Team',
        email: this.configService.get<string>('SENDER_EMAIL') || 'hello@ypit.org',
      };
      sendSmtpEmail.to = [{ email: data.to, name: data.name }];

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(`✅ Confirmation email sent to ${data.to}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }

  private generateEmailHtml(data: EmailData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to YPIT Hackathon</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a1628;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background: linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%); border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%);">
              <h1 style="margin: 0; color: #0a1628; font-size: 28px; font-weight: bold;">YPIT</h1>
              <p style="margin: 8px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">The Artificial Future</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px; color: #f8fafc;">
              <h2 style="margin: 0 0 20px 0; color: #06b6d4; font-size: 24px;">Welcome, ${data.name}!</h2>
              
              <p style="margin: 0 0 20px 0; line-height: 1.6; color: #e2e8f0;">
                You've successfully registered for <strong style="color: #06b6d4;">YPIT: The Artificial Future</strong> - Nigeria's biggest AI hackathon. We're excited to have you join us in Lagos!
              </p>
              
              <div style="background-color: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #06b6d4; font-size: 16px;">Your Registration Details</h3>
                <p style="margin: 0 0 8px 0; color: #e2e8f0;"><strong>Registration ID:</strong> ${data.registrationId}</p>
                <p style="margin: 0 0 8px 0; color: #e2e8f0;"><strong>Track:</strong> ${data.hackathonTrack}</p>
                <p style="margin: 0; color: #e2e8f0;"><strong>Team Size:</strong> ${data.teamSize} member(s)</p>
              </div>
              
              <h3 style="margin: 30px 0 15px 0; color: #14b8a6; font-size: 18px;">What's Next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #e2e8f0; line-height: 1.8;">
                <li>Join our community channels for team formation</li>
                <li>Attend pre-hackathon workshops to level up your skills</li>
                <li>Keep an eye on your inbox for event updates</li>
                <li>Start brainstorming solutions for your chosen track</li>
              </ul>
              
              <p style="margin: 30px 0 0 0; line-height: 1.6; color: #e2e8f0;">
                Remember: This hackathon is about learning, building, and creating impact. Whether you're new to AI or an experienced builder, there's a place for you here.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(6, 182, 212, 0.2);">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">
                Building Africa's AI Future, Together.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Lagos, Nigeria | 2025
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }
}

