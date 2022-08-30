import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserDTO } from "../dto/userDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { Result } from "../utils/Result";

export interface IServiceUser{
    validarUser(user: UserLoginDTO): Promise<Result<UserDTO>>
    registerUser(user: UserDTO): Promise<Result<UserDTO>>
}