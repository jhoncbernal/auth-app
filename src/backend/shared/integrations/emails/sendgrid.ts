import sgMail from "@sendgrid/mail";
import { injectable } from "inversify";
import type {
  IEmail,
  IEmailParams,
} from "@/backend/shared/interfaces/email.interface";
import { SENDGRID } from "@/backend/shared/config";

@injectable()
export class SendGrid implements IEmail {
  constructor() {
    sgMail.setApiKey(SENDGRID.apiKey);
  }

  async sendEmail(params: IEmailParams): Promise<void> {
    const body = {
      to: params.destination,
      from: {
        email: params.source,
        name: params.title,
      },
      templateId: params.template.name,
      dynamicTemplateData: params.data,
    };

    try {
      console.log(body);
      await sgMail.send(body);
      console.info("[SendGrid]: Email sent successfully");
    } catch (error) {
      console.error("[SendGrid]: Error sending email:", error);
      throw error;
    }
  }
}
