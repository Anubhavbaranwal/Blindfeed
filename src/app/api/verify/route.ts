import { z } from "zod";
import connectdb from "@/lib/dbconnect";
import Usermodel from "@/model/User.model";
import { codevalidator } from "@/schemas/verifyschema";

export async function POST(request: Request) {
  await connectdb();

  try {
    const { username, otp } = await request.json();
    //zod validate
    console.log(username, otp);
    const validatedotp = codevalidator.safeParse({ code: otp });
    if (!validatedotp.success) {
      return Response.json(
        {
          success: false,
          message: validatedotp.error.format().code?._errors || [],
        },
        { status: 400 }
      );
    }
    const { code } = validatedotp.data;
    const existingUser = await Usermodel.findOne({
      name: username,
    });
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    if (
      existingUser.verifyCode === code &&
      existingUser.verificationCodeExpires > new Date()
    ) {
      existingUser.isVerified = true;
      await existingUser.save();
      return Response.json(
        { success: true, message: "User verified successfully" },
        { status: 200 }
      );
    }
    if (existingUser.verificationCodeExpires < new Date()) {
      return Response.json(
        { success: false, message: "OTP expired" },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );
  } catch (error) {
    console.error("error while checking username");
    return Response.json(
      { success: false, message: "error occured while checking username" },
      { status: 500 }
    );
  }
}
