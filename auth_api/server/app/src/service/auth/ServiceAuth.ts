import { UserAuthDTO } from "../../dto/auth/userAuthDTO";
import { UserDTO } from "../../dto/user/UserDTO";
import { IServiceAuth } from "./IServiceAuth";
import jwt from "jsonwebtoken"

export class ServiceAuth implements IServiceAuth{
    validaUSer(userEncontrado: UserDTO, userEnviado: UserAuthDTO): boolean {
        if(userEncontrado.password === userEnviado.password) return true
        return false
    }
    gerarToken(user: UserDTO, secret: String): string {
        const key = Buffer.from(secret, 'base64')
  
        const token = jwt.sign({userId: user.cracha, perfil: user.perfil}, key)
        return `Bearer ${token}`
    } 
    
}