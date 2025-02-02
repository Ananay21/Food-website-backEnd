import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "./schema/user.js";
import {menuModel} from "./schema/menu.js";

dotenv.config();

mongoose.
    connect(`${process.env.MONGODB_URI}/foodDeliveryDB`)
    .then(()=>{console.log("mongoDB connected")})
    .catch((err)=>{console.log(`error in connecting to DB as:\n${err}`)});

const app= new express();
const port=parseInt(process.env.PORT);
const rounds=10;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    console.log("hello to the food delivery API");
    res.status(200).send("<h1>Food delivery API</h1>");
})

app.get("/menu",async (req,res)=>{
    const result=await menuModel.find();
    res.status(200).json(result);
});

app.get("/menu/:id",async (req,res)=>{
    const id=req.params.id;
    const result=await menuModel.findById(id);
    res.status(200).json(result);
});

app.post("/menu",async (req,res)=>{
    const menuItem={
        name:req.body.name,
        category:req.body.category,
        price:parseInt(req.body.price),
    }
    if(!menuItem.name||!menuItem.category||!menuItem.price){
        res.status(400).json({msg:"all fields are required!"});
    }
    else{
        const result=await menuModel.create({name:menuItem.name,category:menuItem.category,price:menuItem.price});
        res.status(200).json({msg:"menu item created!"});
    }
});

app.put("/menu/:id",async (req,res)=>{
    const id=parseInt(req.params.id);
    const upDateItem={
        name:req.body.name,
        category:req.body.category,
        price:parseInt(req.body.price),
        availability:(req.body.isAvailable==="true"?true:false)
    }
    const result=await menuModel.findByIdAndUpdate(req.params.id,upDateItem);
    res.status(200).json({msg:"updated the menu item!"});
});

app.delete("/menu/:id",async (req,res)=>{
    const id=req.params.id;
    const result=await menuModel.findByIdAndDelete(id);
    res.status(200).json({msg:"deleted the menu item!"});
});

app.post("/register",async (req,res)=>{
    const registerObj={
        userName:req.body.userName,
        password:req.body.password
    }
    if(!registerObj.userName||!registerObj.password){
        res.status(400).json({msg:"all fields are required!"});
    }
    else{
        const encPassword=await bcrypt.hash(registerObj.password,rounds);
        const result=await userModel.create({userName:registerObj.userName,password:encPassword});
        res.status(200).json({msg:"creation successful!"});
    }
});

app.post("/login",async (req,res)=>{
    const registerObj={
        userName:req.body.userName,
        password:req.body.password
    }
    if(!registerObj.userName||!registerObj.password){
        res.status(400).json({msg:"all fields are required!"});
    }
    else{
        const result=await userModel.findOne({userName:registerObj.userName});
        const checkPassword=await bcrypt.compare(registerObj.password,result.password);

        if(checkPassword===true){
            res.status(200).json({msg:"Welcome back!",isLogged:true});
        }
        else{
            res.status(403).json({msg:"incorrect password!",isLogged:false});
        }
        
    }
})

app.listen(port,()=>{console.log(`app listening on port ${port}`)});