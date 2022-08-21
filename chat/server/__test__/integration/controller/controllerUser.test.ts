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

    it("Se colaborador enviado não for encontrado, 404 e mensagem de erro são retornadas", async () => {
        let userAuth = new UserLoginDTO("User teste", "SenhaTeste")

        let response = await request(app)
            .get("/api/chat/login")
            .send(userAuth)

        expect(response.status).toBe(401)
        expect(response.body).toEqual({error: "Falha de autenticação, usuário ou senha inválida"})
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

    it("Se parâmetros enviados forem inválidos, 401 é retornado", () => {
        
    })
})