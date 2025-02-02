import mongoose from "mongoose";
import DB_NAME from "../constants.js"

const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongoDB connection successful! \nDB HostName: ${connectionInstance.connection.host}`);
    }catch(err){
        console.log(`mongoDB connection error due to:\n${err}`);
        process.exit(1);
    }
}

export default connectDB;