import { UserDTO } from "../dto/userDTO"
import { UserLoginDTO } from "../dto/userLoginDTO"
import { InvalidParams } from "../errors/InvalidParams"
import { Result } from "../utils/Result"

function factoryUserByLogin(json: any): Result<UserLoginDTO>{
    try {
        if(!validName(json.name)) return Result<UserLoginDTO>.fail(new InvalidParams("nome de usuário deve ter mais de 5 caracteres"))
        if(!validPassword(json.password)) return Result<UserLoginDTO>.fail(new InvalidParams("senha deve ter mais de 5 caracteres"))
        return Result<UserLoginDTO>.ok(new UserLoginDTO(json.name, json.password))
    } catch (error) {
        return Result<UserLoginDTO>.fail(new InvalidParams("Não foi possível desserializar parâmetros"))
    }
}

function factoryUserByCadastro(json: any): Result<UserDTO>{
    try {
        if(!validName(json.name)) return Result<UserDTO>.fail(new InvalidParams("nome de usuário deve ter mais de 5 caracteres"))
        if(!validPassword(json.password)) return Result<UserDTO>.fail(new InvalidParams("senha deve ter mais de 5 caracteres"))
        return Result<UserDTO>.ok(new UserDTO(json.name, json.password))
    } catch (error) {
        return Result<UserDTO>.fail(new InvalidParams("Não foi possível desserializar parâmetros"))
    }
}

function validName(name: String){
    return name.length > 5 ? true : false
}

function validPassword(password: String){
    return password.length > 5 ? true : false
}

export{
    factoryUserByCadastro,
    factoryUserByLogin
}