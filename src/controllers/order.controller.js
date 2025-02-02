import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import {orderModel} from "../models/order.model.js";

const postOrder=asyncHandler(async function(req,res){
    const getObj={
        orderID:req.body.userID,
        items:req.body.selectedItems,
        totalAmount:req.body.totalAmount,
        status:req.body.status
    }

    if(!getObj.orderID||!getObj.items||!getObj.totalAmount||!getObj.status){
        throw new apiError(401,"Please fill the required fields!");
    }

    const addOrder=await orderModel.create(getObj);

    if(!addOrder){
        throw new apiError(500,"Error during creating data!");
    }

    res.status(200).json(new apiResponse(200,getObj,"Order created, please wait for your order!"));
});

const getOrder=asyncHandler(async function(req,res){
    const id=req.params.id;
    
    if(!id){
        throw new apiError(401,"User is not logged in!");
    }

    const getAllOrders=await orderModel.find({orderID:id});

    if(!getAllOrders){
        throw new apiError(500,"Error while finding your orders!");
    }

    res.status(200).json(new apiResponse(200,getAllOrders,"User orders found!"));
});

export {postOrder,getOrder};