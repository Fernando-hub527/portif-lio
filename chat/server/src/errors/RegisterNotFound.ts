import { IError } from "./IError";

export class RegisterNotFound implements IError{
    msgError: String;
    statusCode = 404

    constructor(idRegistro: String, name: String){
        this.msgError = `Could not find ${name} record with id ${idRegistro}`
    }

    getError(): String {
        return this.msgError
    }
    getStatus(): number{
        return this.statusCode
    }


}