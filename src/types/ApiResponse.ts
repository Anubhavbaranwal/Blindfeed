import { Message } from "@/model/User.model";

export interface ApiResponse {
    success:boolean,
    message:string,
    isAcceptingMsg?:boolean,
    messages?:Array<Message>,
}