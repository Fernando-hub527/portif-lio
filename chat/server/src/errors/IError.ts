export interface IError{
    statusCode: Number
    msgError: String
    
    getError(): String
    getStatus(): Number
}