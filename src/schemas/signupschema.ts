import {z} from "zod";

export const nameValidator = z.string().min(3).max(20,"Name should be between 3 to 20 characters");

export const signupSchema = z.object({
    name: nameValidator,
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6,{message: "Password should be atleast 6 characters"}),
    confirmPassword: z.string().min(6,{message: "Password should be atleast 6 characters"})
});