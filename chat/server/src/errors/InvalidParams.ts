import { IError } from "./IError";

export class InvalidParams implements IError{
    statusCode = 400;
    msgError: String;

    constructor(rasonError: String){
        this.msgError = `invalid params, ${rasonError}`
    }

    getError(): String {
        return this.msgError
    }
    getStatus(): number {
        return this.statusCode
    }

}