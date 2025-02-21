import { User, getServerSession } from "next-auth";
import connectdb from "@/lib/dbconnect";
import Usermodel, { Message } from "@/model/User.model";

export async function POST(request: Request) {
    await connectdb();

    const {username,message:content}=await request.json();
    try {
        const user= await Usermodel.findOne({name:username});
        if(!user){
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
              );
        }
        if(!user?.isAcceptingmessages){
            return Response.json(
                { success: false, message: "User is not accepting messages" },
                { status: 400 }
              );
        }
        if(!content){
            return Response.json(
                { success: false, message: "content is required" },
                { status: 400 }
              );
        }
        const newmessage={content,createdAt:new Date()};
        user.messages.push(newmessage as Message);
        await user.save();

        return Response.json(
            { success: true, message: "message sent successfully" },
            { status: 200 }
          );
    } catch (error) {
        return Response.json(
            { success: false, message: "error occured while sending message" },
            { status: 500 }
          );
    }

}