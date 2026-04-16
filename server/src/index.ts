import  'dotenv/config';
import express  from "express";
import type { Request , Response } from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.Route.js"
import { errorHandler } from './middlewares/errorHandler.js';

const port = process.env.PORT || 8000
const app = express()



// database connection
pool.connect().then(()=>{
    console.log("Connected to database successully ")
}).catch((error) =>console.log(error))

// middlewares 
app.use(express.json())
app.use("/api" , authRoutes)
app.use(errorHandler)

app.get("/" , (req : Request , res:Response)=>{
    res.json({success:"true" , message:"Hello Word "})
})

app.listen( port , ()=>{
    console.log(`Server started at port number ${port}`)
})

