import express, { Application, json } from 'express'
import cors from 'cors'
import routs from '../routs/indexRouts'
import http from "http"
import { configurarSocket } from './webSocket'
import { Server } from 'socket.io'

function startTestApp(){
    return setMiddleares(express())
}

function startApplication(port: number){
    let app = setMiddleares(express())
    let server = http.createServer(app)
    configurarSocket(new Server(server, {cors:{origin: "*"}}));

    server.listen(3030, () => {console.log("Server is runing")})
    return server
}


function setMiddleares (app: Application) {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      next()
    })
    app.use(cors())
    app.use(json())
    app.use(routs)
    return app
}

export default {
    setMiddleares,
    startApplication,
    startTestApp
}