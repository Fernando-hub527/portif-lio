import { IError } from "./IError";

export class InvalidCredentials implements IError{
    statusCode = 400;
    msgError: String;

    constructor(){
        this.msgError = `Invalid user credentials`
    }

    getError(): String {
        throw new Error("Method not implemented.");
    }
    getStatus(): Number {
        throw new Error("Method not implemented.");
    }

}