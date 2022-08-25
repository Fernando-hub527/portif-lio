import { UserDTO } from "../../dto/userDTO";
import { Result } from "../../utils/Result";

export interface IRepositoryUser{
    foundUserByName(nameUser: String): Promise<Result<UserDTO>>
    createUser(user: UserDTO): Promise<Result<UserDTO>>
}