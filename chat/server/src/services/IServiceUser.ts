import { UserLoginDTO } from "../dto/userLoginDTO";

export interface IServiceUser{
    validarUsuario(payloadToken: Object, user: UserLoginDTO, secretKey: String): Promise<String>
}