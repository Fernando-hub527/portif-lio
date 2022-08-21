import { Request, Response } from "express";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { IServiceUser } from "../services/IServiceUser";
import { ServiceUser } from "../services/ServiceUser";
import dotenv from 'dotenv'
import { UserDTO } from "../dto/userDTO";
dotenv.config({path: "./server/env/dev/.env"})

export class ControllerUser{
    serviceUser: IServiceUser
    constructor(serviceUser?: IServiceUser){
        this.serviceUser = serviceUser || new ServiceUser()
    }

    login(req: Request, res: Response){
        this.serviceUser.validarUsuario({}, new UserLoginDTO(req.body.user, req.body.password), process.env.SECRET_KEY!).then((token) => {
            res.status(201).send(token)
        }).catch((error) => {
            res.status(401).send({error:error})
        })
    }

    registredUser(req: Request, res: Response){
        this.serviceUser.registerUser(new UserDTO(req.body.name, req.body.password)).then((user) => {
            res.status(201)
        }).catch((error) => {
            res.status(400).send(error)
        })
    }
    
}