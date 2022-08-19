import { UserDTO } from "../../dto/userDTO";
import { IRepositoryUser } from "./IRepositoryUser";
import entityUser from "../entidades/entityUser";

export class RepositoryUser implements IRepositoryUser{
    foundUserByName(nameUser: String): Promise<UserDTO> {
        return new Promise((resolve, reject) => {
            entityUser.findOne({nameUser: nameUser})
                .then((user: UserDTO) => resolve(user))
                .catch(() => reject(`Usuário com nome ${nameUser} não encontrado`))
        })

    }
    createUser(user: UserDTO): Promise<UserDTO> {
        return new Promise((resolve, reject) => {
            entityUser.createUser(user)
                .then((user: UserDTO) => resolve(user))
                .catch(() => reject(`Não foi possível cadastrar usuário`))
        })
    }
}