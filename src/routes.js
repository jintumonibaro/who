import { router as authRoutes } from "./features/auth/route.js";
import Router from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { httpAuthenticate } from "./middleware/authentication.js";

import { router as eventRoutes } from "./features/events/routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = Router()

router.use("/auth", authRoutes)
router.use("/event", eventRoutes)
router.get("/login", (req, res) =>
{
    res.sendFile(path.join(__dirname, "./views/login.html"))
})

router.get("/signup", (req, res) =>
{
    res.sendFile(path.join(__dirname, "./views/signup.html"))
})






router.get('/me', httpAuthenticate, (req, res) =>
{
    res.json(req.user)
})

router.get("/", (req, res) =>
{
    res.sendFile(path.join(__dirname, "./views/home.html"))
})

export {router}
