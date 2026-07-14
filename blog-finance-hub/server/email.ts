import { Resend } from "resend";
import { ENV } from "./_core/env";

export interface ContactEmailData {
  fromName: string;
  fromEmail: string;
  subject: string;
  message: string;
}

function getResendClient(): Resend {
  if (!ENV.resendApiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Please add it in the project secrets."
    );
  }
  return new Resend(ENV.resendApiKey);
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const resend = getResendClient();

  const { error } = await resend.emails.send({
    from: "DeCodes Life <onboarding@resend.dev>",
    to: ["dekena.wade@gmail.com"],
    replyTo: `${data.fromName} <${data.fromEmail}>`,
    subject: `[DeCodes Life] ${data.subject}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafaf8; border: 1px solid #e8e0d0;">
        <h2 style="color: #0f766e; font-size: 22px; margin-bottom: 4px;">New message from DeCodes Life</h2>
        <p style="color: #888; font-size: 13px; margin-bottom: 24px; border-bottom: 1px solid #e8e0d0; padding-bottom: 16px;">
          Submitted via the contact form at finbloghub.manus.space
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 13px; width: 80px; vertical-align: top;"><strong>From:</strong></td>
            <td style="padding: 8px 0; color: #222; font-size: 14px;">${data.fromName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; color: #222; font-size: 14px;">
              <a href="mailto:${data.fromEmail}" style="color: #0f766e;">${data.fromEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;"><strong>Subject:</strong></td>
            <td style="padding: 8px 0; color: #222; font-size: 14px;">${data.subject}</td>
          </tr>
        </table>

        <div style="background: #fff; border: 1px solid #e8e0d0; border-radius: 4px; padding: 20px; margin-bottom: 24px;">
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0;">Message</p>
          <p style="color: #222; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>

        <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
          Hit reply to respond directly to ${data.fromName}.
        </p>
      </div>
    `,
    text: `New message from DeCodes Life\n\nFrom: ${data.fromName}\nEmail: ${data.fromEmail}\nSubject: ${data.subject}\n\nMessage:\n${data.message}\n\n---\nReply to this email to respond directly to ${data.fromName}.`,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
