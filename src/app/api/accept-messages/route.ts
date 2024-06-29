import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectdb from "@/lib/dbconnect";
import { isAborted } from "zod";
import Usermodel from "@/model/User.model";

export async function POST(request: Request) {
  await connectdb();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userid = user.id;
  const { message } = await request.json();
  if (!message) {
    return Response.json(
      { success: false, message: "message is required" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await Usermodel.findByIdAndUpdate(
      userid,
      { isAcceptingmessages: message },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "message acceptance  updated successfully", updatedUser},
      { status: 200 }
    );
  } catch (error) {
    console.error("error while accepting messages");
    return Response.json(
      { success: false, message: "error occured while accepting messages" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
    await connectdb();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const userid = user.id;
    try {
        const finduser= await Usermodel.findById(userid);
        if(!finduser){
          return Response.json(
            { success: false, message: "User not found" },
            { status: 404 }
          );
        }
        return Response.json(
            { success: true, message: "User Accepting the message", Acceptingmessage: finduser.isAcceptingmessages },
            { status: 200 }
            );
    
    } catch (error) {
        return Response.json(
            { success: false, message: "error occured while getting user message acceptance" },
            { status: 500 }
        );
    }

}  