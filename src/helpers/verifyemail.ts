import transporter from "@/lib/nodemailer";
import VerificationEmail from "../../emailTemp/VerifyEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/components";

export async function verifyEmail(email: string, username: string, otp: string): Promise<ApiResponse> {
  try {
    const emailHtml = render(VerificationEmail({ username, otp }));

    const info = await transporter.sendMail({
      from: '"Your App Name" <no-reply@example.com>',
      to: email,
      subject: ' Verify your email address',
      html: emailHtml,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, message: "Email sent for verification" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error occurred during email verification" };
  }
}