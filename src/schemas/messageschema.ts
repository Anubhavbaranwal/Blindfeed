import {z} from "zod";

export const messageschema=z.object({
    message:z.string().min(10,{message:"Message should be atleast 10 characters"})
})