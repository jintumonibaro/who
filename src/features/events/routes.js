import { Router } from "express";
import { postEvent, getEvents, postRegisterEvent, verifyEvent } from "./controller.js";
import { httpAuthenticate,  } from "../../middleware/authentication.js"; 
const router = Router()


router.post("/postEvent", httpAuthenticate,postEvent)
router.get("/getEvents", getEvents)
router.post("/RegisterEvent", httpAuthenticate,postRegisterEvent)
router.get("/verifyEvent", httpAuthenticate, verifyEvent)


export {router}