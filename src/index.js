import connectDB from "./db/index.js";
import dotenv from "dotenv";

import {app} from "./app.js";

dotenv.config(
    {
        path:"./.env"
    }
);

connectDB().
then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server listening on port ${process.env.PORT}`);
    })
}).
catch((err)=>{
    console.log(`error in connecting to DB due to:${err}`);
})
