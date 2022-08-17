import request from "supertest"
import { AplicationManager } from "../../app/src/api/AplicationManager"
import modulo from "../../app/src/database/entityModulo"
import user from "../../app/src/database/entityUser"
import { ModuloDTO } from "../../app/src/dto/modulo/ModuloDTO"
import { UserDTO } from "../../app/src/dto/user/UserDTO"
import { UserDTOResponse } from "../../app/src/dto/user/UserDTOResponse"
import { ServiceAuth } from "../../app/src/service/auth/ServiceAuth"

let app = new AplicationManager().startTeste()
let serviceAuth = new ServiceAuth()

describe("#### FIND USER ###", () => {

    beforeEach(async () => {
        await user.deleteMany()
        await modulo.deleteMany()
    })
    it("Se token não for informado, status 401 é retornado", async () => {
        let response = await request(app)
            .get("/api/v1/portaria/colaborador")
        expect(response.statusCode).toEqual(401)
    })

    it("Se token informado for inválido,status 403 é retornado", async () => {
        let userEnviado = new UserDTO(123456789, "user test", "123456789", "te te te te", 1, [1,2])

        let response = await request(app)
            .get("/api/v1/portaria/colaborador")
            .set('Authorization', serviceAuth.gerarToken(userEnviado, "teste"))
        expect(response.statusCode).toEqual(403)
        expect(response.body).toEqual({error: "Failed to authenticate token."})
    })

    it("Se token for  valido, acesso a rota é liberada", async () => {
        let userEnviado = new UserDTO(123456789, "user test", "123456789", "te te te te", 1, [1,2])

        let response = await request(app)
            .get("/api/v1/portaria/colaborador")
            .set('Authorization', serviceAuth.gerarToken(userEnviado, process.env.SECRET_KEY))
        
        expect(response.body).not.toEqual({error: "Failed to authenticate token."})
    })

    it("Se todos parâmetros válidos, usuário é retornado", async () => {
        let moduloCadastrado = new ModuloDTO(1, "modulo1")
        let userEnviado = new UserDTO(123456789, "user test", "123456789", "te te te te", 1, [moduloCadastrado.id])
        let userEsperado = new UserDTOResponse(userEnviado.cracha, userEnviado.name, userEnviado.tag, userEnviado.perfil, [moduloCadastrado])
        
        await modulo.create(moduloCadastrado)
        await user.create(userEnviado)

        let response = await request(app)
            .get("/api/v1/portaria/colaborador")
            .set('Authorization', serviceAuth.gerarToken(userEnviado, process.env.SECRET_KEY))

        expect(response.body.cracha).toEqual(userEsperado.cracha)
    })

})

