export interface IError{
    statusCode: number
    msgError: String
    
    getError(): String
    getStatus(): number
}