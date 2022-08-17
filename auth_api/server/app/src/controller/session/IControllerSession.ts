import { Request, Response } from "express";

export interface IControllerSession{
    login(req: Request, res: Response): void
}