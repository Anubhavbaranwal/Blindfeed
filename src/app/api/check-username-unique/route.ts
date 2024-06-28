import { z } from "zod";
import { nameValidator } from "@/schemas/signupschema";
import connectdb from "@/lib/dbconnect";
import Usermodel from "@/model/User.model";

const usernamevalidateSchema = z.object({
  username: nameValidator,
});

export async function GET(request: Request) {
  await connectdb();

  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams.get("username"));
    const usernameparams = {
      username: searchParams.get("username"),
    };

    //zod validate
    const validatedusername = usernamevalidateSchema.safeParse(usernameparams);

    if (!validatedusername.success) {
      return Response.json(
        {
          success: false,
          message: validatedusername.error.format().username?._errors || [],
        },
        { status: 400 }
      );
    }

    const { username } = validatedusername.data;

    const existingUserByUsername = await Usermodel.findOne({
      name:  username,
      isVerified: true,
    });
    if (existingUserByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }
    return Response.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );
  } catch (error) {
    console.error("eroror while checking username");
    return Response.json(
      { success: false, message: "error occured while checking username" },
      { status: 500 }
    );
  }
}
