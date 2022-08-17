export class UserDTO{
    cracha: number
    name: String
    password: String 
    tag: String
    perfil: number
    modulosId: number[]

    constructor(cracha: number, name: String, password: String, tag: String, perfil: number, modulosId: number[]){
        this.cracha = cracha
        this.name = name
        this.password = password
        this.tag = tag
        this.perfil = perfil
        this.modulosId = modulosId
    }
}