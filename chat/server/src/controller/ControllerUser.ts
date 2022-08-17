import { Request, Response } from "express";

export class ControllerUser{
    login(req: Request, res: Response){
        res.status(404).send({error: "colaborador não encontrado"});
    }
    
}