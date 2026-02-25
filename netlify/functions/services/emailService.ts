import nodemailer from "nodemailer";
import { paymentSuccessTemplate } from "../email-templates/paymentSuccess"

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Optipus" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
}