import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { IRepositoryUser } from "../database/repository/IRepositoryUser";
import { RepositoryUser } from "../database/repository/RepositoryUser";
import { gerarToken } from "../utils/token";
import { IServiceUser } from "./IServiceUser";
import { UserDTO } from "../dto/userDTO";

export class ServiceUser implements IServiceUser{
    repository: IRepositoryUser
    constructor(repository ?: IRepositoryUser){
        this.repository = repository || new RepositoryUser()
    }


    registerUser(user: UserDTO): Promise<UserDTO> {
        return new Promise(async (resolve, reject) => {
            try {
                this.validDefaultPassword(user.password)
                this.checkIfUserAlreadyRegistred(user.name)
                let newUser = await this.repository.createUser(user)
                resolve(newUser)
            } catch (error) {
                reject(error)
            }
        })
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

    private validDefaultPassword(passwordA: String){
        if(passwordA.length <= 5) throw new Error("Password not is valid")
    }

    private checkIfUserAlreadyRegistred(user: String){
        this.repository.foundUserByName(user).then((user) => {
            throw new Error("User already registred")
        }).catch(() => {
            return;
        })
    }
}