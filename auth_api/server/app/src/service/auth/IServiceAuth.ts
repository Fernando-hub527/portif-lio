import { UserAuthDTO } from "../../dto/auth/userAuthDTO"
import { UserDTO } from "../../dto/user/UserDTO"

export interface IServiceAuth{
    gerarToken(user: UserDTO, secret: String): String
    validaUSer(userEncontrado: UserDTO, userEnviado: UserAuthDTO): boolean
}