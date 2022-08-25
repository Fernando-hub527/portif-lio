import { IError } from "./IError";

export class RegisterAlreadyRegistered implements IError{
    statusCode = 400;
    msgError: String;

    constructor(idRegistro: String, name: String){
        this.msgError = `${name} registration with id ${idRegistro} already registered`
    }

    getError(): String {
        throw new Error("Method not implemented.");
    }
    getStatus(): Number {
        throw new Error("Method not implemented.");
    }

}