import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"
import { PORT } from "./constants.js";

dotenv.config({path:"./.env"});


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
})
.catch(err=>{
    console.log("app not connecting to db",err);
    process.exit(1);
})
