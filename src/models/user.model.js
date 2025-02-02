import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:[true, "username must be unique"],
        },
        password:{
            type:String,
            required:[true,"password is required!"]
        },
        refreshToken:{
            type:String
        }
    },{versionKey:false}
);

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,parseInt(process.env.ROUNDS));
    } 
    next();
});

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        userName:this.userName
    }
    ,process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })

}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    }
    ,process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

const userModel=mongoose.model("user_model",userSchema);
export {userModel};