import express from "express"
import { router } from "./routes.js"
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views")); // Changed this line
app.use(cookieParser());
app.use(express.json())
app.use(router)

export {app}