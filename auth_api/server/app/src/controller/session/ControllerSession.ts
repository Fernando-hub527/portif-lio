import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UserAuthDTO } from "../../dto/auth/userAuthDTO";
import { IServiceAuth } from "../../service/auth/IServiceAuth";
import { ServiceAuth } from "../../service/auth/ServiceAuth";
import { IServiceUser } from "../../service/user/IServiceUser";
import { ServiceUser } from "../../service/user/ServiceUser";
import { IControllerSession } from "./IControllerSession";

export class ControllerSesion implements IControllerSession{
    serviceUser: IServiceUser
    serviceAuth: IServiceAuth

    constructor(serviceUser ?: IServiceUser){
        this.serviceUser = serviceUser || new ServiceUser()
        this.serviceAuth = new ServiceAuth()
    }

    login(req: Request, res: Response){
        let requestAuth = new UserAuthDTO(Number(req.body.cracha), req.body.password)
        this.serviceUser.encontrarUsuarioPorId(requestAuth.cracha).then((user)=>{
            let acess = this.serviceAuth.validaUSer(user, requestAuth)
            if(!acess) throw new Error("Acesso negado")
            res.status(200).send({token: this.serviceAuth.gerarToken(user, process.env.SECRET_KEY)})
        }).catch((error) => {
            res.status(403).send({error: "Acesso negado"})
        })
        
    }
}