import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: "lethuydiem.zim@gmail.com",
      subject: "Test Optipus Mail",
      html: "<h1>Mail hoạt động 🚀</h1>",
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();