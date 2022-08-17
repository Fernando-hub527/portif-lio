import express, { json } from 'express'
import routs from '../rotas/indexRouts'
import cors from 'cors'

export class AplicationManager{
    app: express.Application
    constructor(){
        this.app = express()
    }
    
    start(port: number){
        this.setMiddleares()
        this.app.listen(port)
        return this.app
    }
    
    startTeste(){
        this.setMiddleares()
        return this.app
    }
    
    private setMiddleares(){
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            next();
        })
        this.app.use(cors());
        this.app.use(json())
        this.app.use(routs)
    }
}