import { Router } from "express";
import { postSignup, postLogin , postLogout} from "./controller.js";
const router = Router()

router.post("/signup", postSignup)
router.post("/login", postLogin)
router.post("/logout", postLogout)


export {router}