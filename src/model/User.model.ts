 import exp from "constants";
import mongoose, { Schema,Document } from "mongoose";

 export interface Message extends Document {
    content: string;
    createdAt: Date;
 }

 const MessageSchema = new Schema<Message>({
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        required: true},
 });

  
export interface User extends Document {
    name: string;
    email: string;
    password: string;
    messages: Message[];
    isAcceptingmessages: boolean;
    verifyCode: string;
    isVerified: boolean;
    verificationCodeExpires: Date;
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    messages: [MessageSchema],
    isAcceptingmessages: {
        type: Boolean,
        default: true,
    },
    verifyCode: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCodeExpires: {
        type: Date,
        required: true,
    },
});

const Usermodel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default Usermodel;