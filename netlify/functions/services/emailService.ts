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
      user: process.env.GMAIL_USER,         // Đã sửa cho khớp Netlify
      pass: process.env.GMAIL_APP_PASSWORD, // Đã sửa cho khớp Netlify
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Optipus" <${process.env.GMAIL_USER}>`, // Dùng luôn GMAIL_USER làm người gửi
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