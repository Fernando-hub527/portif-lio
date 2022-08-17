import { ModuloDTO } from "../../dto/modulo/ModuloDTO";
import { UserDTO } from "../../dto/user/UserDTO";

export interface IServiceUser{
    encontrarUsuarioPorId(cracha: number): Promise<UserDTO>
    encontrarModuloPorId(id: number): Promise<ModuloDTO>
}