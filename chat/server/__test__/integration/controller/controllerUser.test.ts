import request from "supertest"
import apiApp from "../../../src/api/AplicationManager"
import { UserLoginDTO } from "../../../src/dto/userLoginDTO"
import {verificarTorken, gerarToken} from "../../../src/utils/token"
import dotenv from 'dotenv'
import entityUser from "../../../src/database/entidades/entityUser"
import { UserDTO } from "../../../src/dto/userDTO"
dotenv.config({path: "./server/env/dev/.env"})

let app = apiApp.startTestApp()


describe("Seção", () => {
    beforeEach(async () => {
        await entityUser.deleteMany({})
    })

    it("Se colaborador enviado não for encontrado, 401 e mensagem de erro são retornadas", async () => {
        let userAuth = new UserLoginDTO("User teste", "SenhaTeste")

        let response = await request(app)
            .get("/api/chat/login")
            .send(userAuth)

        expect(response.status).toBe(401)
        expect(JSON.parse(response.text)).toMatchObject({msgError: "Invalid user credentials"})
    })

    it("Se colaborador enviado for encontrado, 201 com token de acesso é retornado", async () => {
        let userAuth = new UserLoginDTO("User teste", "SenhaTeste")
        await entityUser.create(new UserDTO("User teste", "SenhaTeste"))

        let response = await request(app)
        .get("/api/chat/login")
        .send(userAuth)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(gerarToken({}, process.env.SECRET_KEY!))
    })

    it("Se parâmetros enviados forem inválidos, 400 é retornado", async () => {
        await entityUser.create(new UserDTO("User teste", "SenhaTeste"))

        let response = await request(app)
        .get("/api/chat/login")
        .send({nomeUser: "User teste"})

        expect(response.status).toBe(400)
        expect(JSON.parse(response.text)).toMatchObject({msgError: "invalid params, Não foi possível desserializar parâmetros"})
    })
})

describe("Creation of users", () => {
    beforeEach(async () => {
        await entityUser.deleteMany({})
    })

    it("If user already registred, then 409 status is returned", async () => {
        let userRegistred = new UserDTO("user teste", "password test")
        await entityUser.create(userRegistred)
    
        let response = await request(app)
            .post("/api/chat/register")
            .send(userRegistred)

        expect(response.status).toBe(409)
        expect(JSON.parse(response.text)).toMatchObject({msgError: "user registration with id user teste already registered"})
    })
    
    it("if Invalid password is sented then 400 status is returned", async () => {
        let userRegistred = new UserDTO("user teste", "passw")
    
        let response = await request(app)
            .post("/api/chat/register")
            .send(userRegistred)

        expect(response.status).toBe(400)
        expect(JSON.parse(response.text)).toMatchObject({msgError: "invalid params, senha deve ter mais de 5 caracteres"})
    })

    it("User created with sucess", async () => {
        let userRegistred = new UserDTO("user teste", "passwords test")

        let response = await request(app)
            .post("/api/chat/register")
            .send(userRegistred)

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject(userRegistred)
    })
})