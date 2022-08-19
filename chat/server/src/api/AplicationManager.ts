import express, { Application, json } from 'express'
import cors from 'cors'
import routs from '../routs/indexRouts'

// import routs from '../routs/routs'

function startTestApp(){
    return setMiddleares(express())
}

function startApplication(port: number){
   let app = setMiddleares(express())
   app.listen(port)
   return app
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