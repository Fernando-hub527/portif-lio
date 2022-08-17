import { Request, Response } from "express";
import { UserDTOResponse } from "../../dto/user/UserDTOResponse";
import { IServiceUser } from "../../service/user/IServiceUser";
import { ServiceUser } from "../../service/user/ServiceUser";
import { IControllerUser } from "./IControllerUser";

export class ControllerUser implements IControllerUser{
    serviceUser: IServiceUser

    constructor(serviceUser ?: IServiceUser){
        this.serviceUser = serviceUser || new ServiceUser
    }

    encontrarUsuarioPorId(req:Request, res: Response){
        this.serviceUser.encontrarUsuarioPorId(Number(req.params.userId)).then(async (user)=>{
            let userSemPassword = new UserDTOResponse(user.cracha, user.name, user.tag, user.perfil, [])
            for(let idModulo of user.modulosId){
                userSemPassword.modulos.push(await this.serviceUser.encontrarModuloPorId(idModulo))
            }
            res.status(200).send(userSemPassword)
        }).catch((error) => {
            res.status(404).send({error: "Não foi possível finalizar a operação"})
        })
    }
}