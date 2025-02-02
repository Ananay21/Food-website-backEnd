import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import {menuModel} from "../models/menu.model.js";

const getMenu=asyncHandler(async (req,res)=>{
    const allItems=await menuModel.find();
    
    if(!allItems){
        throw new apiError(500,"something went wrong while fetching menu items!");
    }

    res.status(200).json(new apiResponse(200,allItems,"Data found!"));
});

const getSingleItem=asyncHandler(async (req,res)=>{
    const id=req.params.id;

    const getItem=await menuModel.findById(id);

    if(!getItem){
        throw new apiError(500,"error while finding the menu item!");
    }

    res.status(200).json(new apiResponse(200,getItem,"item found!"));
});

const addMenu=asyncHandler(async (req,res)=>{
    const obj={
        name:req.body.name,
        category:req.body.category,
        price:parseInt(req.body.price)
    };
    
    if(!obj.name||!obj.category||!obj.price){
        throw new apiError(400,"Please enter required details!");
    }    

    const addItem=await menuModel.create({
        name:obj.name,
        category:obj.category,
        price:obj.price
    });

    if(!addItem){
        throw new apiError(500,"Error while adding menu item to the database!");
    }

    res.status(200).json(new apiResponse(200,obj,"data added!"));
});

const updateItem=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const checkItem=await menuModel.findById(id);

    if(!checkItem){
        throw new apiError(401,"Menu item not found!");
    }

    const newobj=
    {
        name:req.body.name||checkItem.name,
        category:req.body.category||checkItem.category,
        price:parseInt(req.body.price)||checkItem.price,
        availability:req.body.availability
    }

    if(!newobj.name||!newobj.category||!newobj.name||!newobj.availability){
        res.status(400).json(new apiError(400,"fill the required fields!"));
    }

    const updateItem=await menuModel.findByIdAndUpdate(id,newobj);

    if(!updateItem){
        res.status(500).json(new apiError(500,"error while updating the menu item!"));
    }

    res.status(200).json(new apiResponse(200,newobj,"menu item updated!"));
});

const deleteItem=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const checkItem=await menuModel.findById(id);

    if(!checkItem){
        throw new apiError(401,"Menu item not found!");
    }

    const deleteItem=await menuModel.findByIdAndDelete(id);
    
    if(!deleteItem){
        throw new apiError(500,"error while deleting the item!");
    }

    res.status(200).json(new apiResponse(200,deleteItem,"item deleted!"));
});

export {getMenu,addMenu,updateItem,deleteItem,getSingleItem};