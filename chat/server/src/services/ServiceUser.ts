import { UserLoginDTO } from "../dto/userLoginDTO";
import { IServiceUser } from "./IServiceUser";

export class ServiceUser implements IServiceUser{
    validarUsuario(payloadToken: Object, user: UserLoginDTO, secretKey: String): Promise<String> {
        throw new Error("Method not implemented.");
    }
}