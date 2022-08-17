export class UserLoginDTO{
    nomeUser: String
    password: String
    constructor(nomeUser: String, password: String){
        this.nomeUser = nomeUser
        this.password = password
    }
}