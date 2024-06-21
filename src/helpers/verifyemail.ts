import { resend } from "@/lib/resend";
import VerificationEmail from "../../emailTemp/VerifyEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function verifyEmail(email: string,username:string,otp:string): Promise<ApiResponse> {
    try{
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Unknown Messenger | Verify your email address',
            react: VerificationEmail({ username, otp }) ,
          });
        return {success:true,message:"email sent for verification"};
    }
    catch(err){
       console.log(err);
       return {success:false,message:"error occured during email verification"};
    }   
}