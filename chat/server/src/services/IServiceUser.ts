import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserDTO } from "../dto/userDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { Result } from "../utils/Result";

export interface IServiceUser{
    validarUsuario(user: UserLoginDTO): Promise<Result<UserDTO>>
    generateToken(payload: Object, secretKey: String): Promise<Result<TokenJwtDTO>>
    registerUser(user: UserDTO): Promise<Result<UserDTO>>
}