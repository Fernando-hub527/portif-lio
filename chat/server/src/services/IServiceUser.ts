import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserDTO } from "../dto/userDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";

export interface IServiceUser{
    validarUsuario(payloadToken: Object, user: UserLoginDTO, secretKey: String): Promise<TokenJwtDTO>
    registerUser(user: UserDTO): Promise<UserDTO>
}