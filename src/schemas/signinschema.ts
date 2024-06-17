import {z} from "zod";

export const signinSchema = z.object({
    identifier: z.string().email({message: "Invalid email"}),
    password: z.string().min(6,{message: "Password should be atleast 6 characters"})
});