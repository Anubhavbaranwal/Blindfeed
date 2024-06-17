import {z} from "zod";

export const codevalidator = z.object({
    code:z.string().length(6,"Code should be 6 characters")
});