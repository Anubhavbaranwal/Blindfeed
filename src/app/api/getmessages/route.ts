import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectdb from "@/lib/dbconnect";
import { isAborted } from "zod";
import Usermodel from "@/model/User.model";
import mongoose from "mongoose";

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
    const userid = new mongoose.Types.ObjectId(user.id);

    try {

        const user =await Usermodel.aggregate([
            {$match: {_id: userid}},
            {$unwind: "$messages"},
            {$sort: {"messages.createdAt": -1}},
            {$group: {_id: "$_id", messages: {$push: "$messages"}}},
        ])


        if(!user || user.length === 0){
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
              );
        }

        return Response.json(
            { success: true, messages: user[0].messages },
            { status: 200 }
          );
          
    } catch (error) {
        console.error("error while getting messages");
        return Response.json(
          { success: false, message: "error occured while getting messages" },
          { status: 500 }
        );
      }
    


}