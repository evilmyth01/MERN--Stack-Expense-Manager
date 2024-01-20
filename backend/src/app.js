import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}) )
app.use(express.static("public"))
app.use(cookieParser())


 

import userRouter from "./routes/user.route.js"
import transactionRouter from "./routes/transaction.route.js"

app.use("/api/v1/users",userRouter);



app.use("/api/v1/transactions",transactionRouter);



export {app}

