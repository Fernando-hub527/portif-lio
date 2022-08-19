import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { IRepositoryUser } from "../database/repository/IRepositoryUser";
import { RepositoryUser } from "../database/repository/RepositoryUser";
import { gerarToken } from "../utils/token";
import { IServiceUser } from "./IServiceUser";

export class ServiceUser implements IServiceUser{
    repository: IRepositoryUser
    constructor(repository ?: IRepositoryUser){
        this.repository = repository || new RepositoryUser()
    }
    

    validarUsuario(payloadToken: Object, user: UserLoginDTO, secretKey: string): Promise<TokenJwtDTO> {
        return new Promise((resolve, reject) => {
            this.repository.foundUserByName(user.nomeUser).then((registredUser) => {
                if(this.validaPassword(user.password, registredUser.password))resolve(gerarToken(payloadToken, secretKey))
                else reject("Falha de autenticação, usuário ou senha inválida")
            }).catch(() => {
                reject("Falha de autenticação, usuário ou senha inválida")
            })
        })
    }

    private validaPassword(passwordA: String, passwordB: String){
        return passwordA === passwordB
    }
}