import { UserDTO } from "../dto/userDTO";
import { IRepositoryUser } from "./IRepositoryUser";

export class RepositoryUser implements IRepositoryUser{
    users: UserDTO[]
    constructor(){
        this.users = new Array<UserDTO>()
    }

    foundUserByName(nameUser: String): Promise<UserDTO> {
        return new Promise((resolve, reject) => {
            this.users.forEach((user) => {
                if(user.name === nameUser){
                    resolve(user)
                    return
                }
            })
            reject(`Usuário com nome ${nameUser} não encontradok`)
        })

    }
    createUser(user: UserDTO): Promise<UserDTO> {
        this.users.push(user)
        return new Promise((resolve, reject) => {
            resolve(user)
        })
    }
}