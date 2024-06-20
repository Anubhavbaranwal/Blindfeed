import mongoose from "mongoose";

type connected={
    isconnected?:number
}

const connected :connected={}
const connectdb=async()=>{
    if(connected.isconnected){
        console.log("already connected");
        return;
    }
    try {
        const mngoconnect= await mongoose.connect(process.env.MONGO_URI || "",{})
        connected.isconnected=mngoconnect.connections[0].readyState;
        console.log("connected to db");
    } catch (error) {
        console.log("connection failed",error);
        process.exit(1);
    }
}

export default connectdb;