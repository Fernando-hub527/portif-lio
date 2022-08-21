import { UserDTO } from "../../dto/userDTO";

export interface IRepositoryUser{
    foundUserByName(nameUser: String): Promise<UserDTO>
    createUser(user: UserDTO): Promise<UserDTO>
}