
Descrição: 
    Api para troca de mensagens em tempo real.

FUncionalidades:
    . Permitir o cadastro e login de usuários
    . Permitir a visualização de todos os usuários cadastrados e se estão online
    . Permitir a troca de mensagem entre dois usuários
    

#Routs
    login: 
        method: GET
        url: /api/chat/login
        body: 
            { user: String, password: String }
        response:
            sucess > token jwt
            error > 404 {"error": "colaborador não encontrado"}

    registration: 
        method: POST
        url: /api/chat/registration
        body: 
            { user: String, password: String}
        response: 
            sucess: 201 token jwt
            error: 401 {error: "colaborador já registrado"}

    usuários:
        methodo: GET
        url: /api/chat/users
        response:
            sucess: 201 [{usuario: String, on: boolean}]
            error: 401 {error: "Não foi possível finalizar a operação"}

    send_mensage
        