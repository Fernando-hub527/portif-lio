import { Router } from "express";
import { ControllerSesion } from "../controller/session/ControllerSession";
import { ControllerUser } from "../controller/user/ControllerUser";
import verifyJWT from "../service/auth/jwt/verificaJwt";
let routs = Router()

let controllerSesion = new ControllerSesion()
let controllerUser = new ControllerUser()

routs.post("/api/v1/portaria/login", controllerSesion.login.bind(controllerSesion))
routs.get("/api/v1/portaria/colaborador", verifyJWT,  controllerUser.encontrarUsuarioPorId.bind(controllerUser))

export default routs