import { UserDTO } from "../../dto/user/UserDTO";
import user from "../../database/entityUser";
import { IServiceUser } from "./IServiceUser";
import modulo from "../../database/entityModulo";
import { ModuloDTO } from "../../dto/modulo/ModuloDTO";

export class ServiceUser implements IServiceUser{
    async encontrarUsuarioPorId(cracha: number): Promise<UserDTO> {
        let userFound = await user.findOne({cracha: cracha}) as UserDTO
        return userFound
    }

    async encontrarModuloPorId(id: number): Promise<ModuloDTO>{
        let moduloFound = await modulo.findOne({id: id}) as ModuloDTO
        return moduloFound
    }
}