import { UserDTO } from "../../dto/userDTO";
import { IRepositoryUser } from "./IRepositoryUser";
import entityUser from "../entidades/entityUser";
import { Result } from "../../utils/Result";
import { RegisterNotFound } from "../../errors/RegisterNotFound";
import { RegisterAlreadyRegistered } from "../../errors/RegisterAlreadyRegistered";


export class RepositoryUser implements IRepositoryUser{
    async foundUserByName(nameUser: String): Promise<Result<UserDTO>> {
        try {
            let user = await entityUser.findOne({nameUser: nameUser}) as UserDTO
            if(!user) return Result.fail(new RegisterNotFound(nameUser, "user"))
            return Result<UserDTO>.ok(new UserDTO(user.name, user.password))
        } catch (error) {
            return Result.fail(new RegisterNotFound(nameUser, "user"))
        }       
    }
    async createUser(user: UserDTO): Promise<Result<UserDTO>> {
        try {
            let userCreated = await entityUser.create(user) as UserDTO
            return Result<UserDTO>.ok(new UserDTO(userCreated.name, user.password))
        } catch (error) {
            return Result.fail(new RegisterAlreadyRegistered(user.name, "user"))
        }      
    }
}