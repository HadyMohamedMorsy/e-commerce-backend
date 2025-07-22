import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import emailConfig from "../config/email.config";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(emailConfig.KEY)
    private readonly emailConfiguration: ConfigType<typeof emailConfig>,
  ) {}

  async sendContactThankYou(email: string, name: string, subject: string): Promise<void> {
    const htmlContent = this.generateThankYouTemplate(name, subject);

    await this.mailerService.sendMail({
      to: email,
      subject: "Thank You for Contacting Us",
      html: htmlContent,
    });
  }

  private generateThankYouTemplate(name: string, subject: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                color: #007bff;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .divider {
                border: 0;
                height: 2px;
                background: linear-gradient(to right, #007bff, #6c757d);
                margin: 20px 0;
            }
            .content {
                margin-bottom: 30px;
            }
            .highlight {
                background-color: #e7f3ff;
                padding: 15px;
                border-radius: 6px;
                margin: 15px 0;
                border-left: 4px solid #007bff;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 12px;
            }
            .cta {
                background-color: #007bff;
                color: white;
                padding: 12px 25px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin: 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">E-Commerce Store</div>
                <h1 style="color: #007bff; margin: 0;">Thank You for Contacting Us!</h1>
            </div>
            
            <hr class="divider">
            
            <div class="content">
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>Thank you for reaching out to us! We have successfully received your message and appreciate you taking the time to contact us.</p>
                
                <div class="highlight">
                    <p><strong>Your inquiry about:</strong> "${subject}"</p>
                    <p>has been received and will be reviewed by our team.</p>
                </div>
                
                <p>We will get back to you as soon as possible, typically within 24-48 hours during business days.</p>
                
                <p>If you have any urgent questions or need immediate assistance, please don't hesitate to reach out to us directly.</p>
                
                <p>Thank you for your patience and for choosing our store!</p>
                
                <p>Best regards,<br>
                <strong>The E-Commerce Team</strong></p>
            </div>
            
            <div class="footer">
                <p>This is an automated email. Please do not reply to this email address.</p>
                <p>© 2024 E-Commerce Store. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}
