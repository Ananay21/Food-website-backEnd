import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json(
    {
        limit:"16kb"
    }
));

app.use(express.urlencoded(
    {
        extended:true,
        limit:"16kb"
    }
));

app.use(express.static("public"));

app.use(cookieParser());


// Routes
import userRouter from "./routes/user.routes.js";
import { menuRouter } from "./routes/menu.routes.js";
import orderRouter from "./routes/order.routes.js";

// Route declaration
app.use("/api/v1/user",userRouter);
app.use("/api/v1/menu",menuRouter);
app.use("/api/v1/order",orderRouter);

export {app};