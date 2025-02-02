import mongoose from "mongoose";

const orderSchema=new mongoose.Schema(
    {
        orderID:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel"
        },
        items:[
            {
                itemID:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"menuModel"
                },
                quantity:{
                    type:Number
                }
            }
        ],
        totalAmount:{
            type:Number
        },
        status:{
            type:String,
            enum:["Pending","Completed"]
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

const orderModel=mongoose.model("order",orderSchema);
export {orderModel};