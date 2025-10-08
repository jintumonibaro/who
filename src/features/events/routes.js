import { Router } from "express";
import { postEvent, getEvents } from "./controller.js";
import { httpAuthenticate } from "../../middleware/authentication.js"; 
const router = Router()


router.post("/postEvent", httpAuthenticate,postEvent)
router.get("/getEvents", getEvents)


export {router}