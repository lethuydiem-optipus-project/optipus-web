import "dotenv/config";
import { sendEmail } from "./netlify/functions/services/emailService.ts";

async function test() {
  try {
    const res = await sendEmail({
      to: "lethuydiem.zim@gmail.com",
      subject: "Test Gmail SMTP",
      html: "<h1>SMTP hoạt động 🚀</h1>",
    });

    console.log("SUCCESS:", res);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();