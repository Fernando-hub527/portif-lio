import { IError } from "./IError";

export class RegisterAlreadyRegistered implements IError{
    statusCode = 409;
    msgError: String;

    constructor(idRegistro: String, name: String){
        this.msgError = `${name} registration with id ${idRegistro} already registered`
    }

    getError(): String {
        return this.msgError
    }
    getStatus(): number {
        return this.statusCode
    }

}