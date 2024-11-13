import express, { json } from "express"
const app = express()
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"
import router from "./routes/root.js";
import { errorHandler } from "./middleware/errorHandler.js";
import {logger} from "./middleware/logger.js"
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/dbConn.js";
import { logEvents } from "./middleware/logger.js";
import userRoute from "./routes/userRoutes.js"
import noteRoute from "./routes/noteRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import mongoose from "mongoose";
const port = process.env.PORT || 3300;
app.use(express.json())
app.use(cookieParser())

connectDB()


app.use(logger)

app.use(cors(corsOptions))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.join(__dirname, 'public')))

app.use("/", router)
app.use("/users", userRoute)
app.use("/notes", noteRoute)
app.use("/auth", authRoutes)

app.all("*", (req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({ message: '404 Not Found'})
    } else {
        res.type('text').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', ()=> {
    console.log("Connected to mongodb")
    app.listen(port, ()=>{
        console.log(`Server running on ${port}`)
    })
})

mongoose.connection.on('error', err=> {
    console.log(err)
    logEvents(`${err.on}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
