import mongoose from "mongoose";


const menuSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            enum:["Appetizers","Main Course","Desserts"],
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        availability:{
            type:Boolean,
            default:true
        }
    },
    {
        versionKey:false
    }
);

const menuModel=mongoose.model("menu_model",menuSchema);
export {menuModel};