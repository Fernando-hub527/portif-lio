import { Router } from "express";
import { ControllerUser } from "../controller/ControllerUser";

const routs = Router()
let controller = new ControllerUser()

routs.get("/api/chat/login", controller.login.bind(controller))

export default routs