import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { userModel } from "../models/user.model.js";
import {apiResponse} from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens=async (userID)=>{
    try {
        const user=await userModel.findById(userID);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};

    } catch (error) {
        throw new apiError(500,"Something went wrong while generating refresh and access token");
    }
}

const registerUser=asyncHandler(async (req,res)=>{
    const {userName,passWord}=req.body;
    if(!userName||!passWord){
        throw new apiError(400,"Please fill the required fields!");
    }
    
    const existedUser=await userModel.findOne({userName});
    if(existedUser){
        throw new apiError(409,"username already exists!");
    }
    
    // enter object in the user
    const user=await userModel.create({
        userName:userName,
        password:passWord
    });

    const createdUser=await userModel.findById(user._id).select("-password -_id");

    if(!createdUser){
        const er=new apiError(500,"Something went wrong while registering the user!");
    }
    return res.status(201).json(new apiResponse(200,createdUser,"user registered successfully!"));
});

const loginUser=asyncHandler(async (req,res)=>{
    const {userName,passWord}=req.body;

    if(!userName||!passWord){
        throw new apiError(400,"Please fill the required fields!");
    }
    
    const user=await userModel.findOne({userName});

    if(!user){
        throw new apiError(404,"user does not exist!");
    }
    
    const checkPassword=await user.isPasswordCorrect(passWord);

    if(!checkPassword){
        throw new apiError(401,"password incorrect!");
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    const loggedInUser=await userModel.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200).
    cookie("accessToken",accessToken,options).
    cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(200,
            {
                user:loggedInUser,accessToken,refreshToken
            },"user logged in successfully!")
    );
});

const logoutUser=asyncHandler(async(req,res)=>{
    const user=await userModel.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        }
        ,
        { 
            new:true
        }
    );

    const options=
    {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(200,{},"User logged out!"));

});

export {
    registerUser,
    loginUser,
    logoutUser};