import { ModuloDTO } from "../modulo/ModuloDTO"

export class UserDTOResponse{
    cracha: number
    name: String
    tag: String
    perfil: number
    modulos: ModuloDTO[]

    constructor(cracha: number, name: String, tag: String, perfil: number, modulos: ModuloDTO[]){
        this.cracha = cracha
        this.name = name
        this.tag = tag
        this.perfil = perfil
        this.modulos = modulos
    }
}