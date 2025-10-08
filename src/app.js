import express from "express"
import { router } from "./routes.js"
import cookieParser from "cookie-parser";


const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(router)

export {app}