import { Request, Response } from "express"

export interface IControllerUser{
    encontrarUsuarioPorId(req:Request, res: Response): void
}