import request from "supertest"
import { UserAuthDTO } from "../../app/src/dto/auth/userAuthDTO"
import { AplicationManager } from "../../app/src/api/AplicationManager"
import user from "../../app/src/database/entityUser"
import { UserDTO } from "../../app/src/dto/user/UserDTO"

let app = new AplicationManager().startTeste()

describe("#### SESSION ###", () => {
    beforeEach(async () => {
        await user.deleteMany()
    })
    it("Se usuário não estiver cadastrado, 403 é retornado", async ()=>{
        let userEnviado = new UserAuthDTO(12456789, "teste123")
        let response = await request(app)
            .post("/api/v1/portaria/login")
            .send(userEnviado)

        expect(response.statusCode).toEqual(403)
    })

    it("Se senha enviada for inválida, status 403 é retornado", async ()=>{
        await user.create(new UserDTO(123456, "user test", "123456789", "te te te te", 1, [1,2]))

        let userEnviado = new UserAuthDTO(123456, "teste123")
        let response = await request(app)
            .post("/api/v1/portaria/login")
            .send(userEnviado)

        expect(response.statusCode).toEqual(403)
    })

    it("Se todos parâmetros válidos, token é retornado", async () => {
        let userCadastrado = new UserDTO(123456, "user test", "123456789", "te te te te", 1, [1,2])
        await user.create(userCadastrado)

        let userEnviado = new UserAuthDTO(userCadastrado.cracha, userCadastrado.password)
        let response = await request(app)
            .post("/api/v1/portaria/login")
            .send(userEnviado)

        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.text).token).not.toEqual(undefined)
    })
})