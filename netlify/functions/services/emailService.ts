import nodemailer from "nodemailer";
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
      user: process.env.EMAIL_FROM,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Optipus" <${process.env.EMAIL_FROM}>`,
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