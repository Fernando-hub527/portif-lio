import { Request, Response } from "express";
import { IServiceUser } from "../services/IServiceUser";
import { ServiceUser } from "../services/ServiceUser";
import dotenv from 'dotenv'
import { gerarToken } from "../utils/token";
import { factoryUserByCadastro, factoryUserByLogin } from "../factorys/factoryUser";
import { IError } from "../errors/IError";
dotenv.config({path: "./server/env/dev/.env"})

export class ControllerUser{
    serviceUser: IServiceUser
    constructor(serviceUser?: IServiceUser){
        this.serviceUser = serviceUser || new ServiceUser()
    }

    async login(req: Request, res: Response){
        const userOrError = factoryUserByLogin(req.body)
        if(!userOrError.isSucess) return this.sendError(userOrError.getError(), res)
        
        const validUserOrError = await this.serviceUser.validarUser(userOrError.getValue()!)
        if(!validUserOrError.isSucess) return this.sendError(validUserOrError.getError(), res)
        
        return res.status(201).send(gerarToken({}, process.env.SECRET_KEY!))        
    }

    async registredUser(req: Request, res: Response){
        const userOrError = factoryUserByCadastro(req.body)
        if(!userOrError.isSucess) return this.sendError(userOrError.getError(), res)

        const registredUserOrError = await this.serviceUser.registerUser(userOrError.getValue()!)
        if(!registredUserOrError.isSucess) return this.sendError(registredUserOrError.getError(), res)

        return res.status(201).send(registredUserOrError.getValue())
    }
    
    private sendError(error: IError, res: Response){
        return res.status(error.getStatus()).send(JSON.stringify(error))
    }
}