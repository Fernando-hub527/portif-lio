import { InvalidParams } from "../errors/InvalidParams"
import { Result } from "../utils/Result"

export class UserLoginDTO{
    name: String
    password: String
    constructor(nomeUser: String, password: String){
        this.name = nomeUser
        this.password = password
    }
}