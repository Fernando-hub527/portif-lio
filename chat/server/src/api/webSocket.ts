import { Server} from "socket.io";
import { ServiceUser } from "../services/ServiceUser";

export function configurarSocket(io:  Server){
    var salas = new Array<{name: String, id: Number}>()

    io.on("connection", socket => {
        salas = salas
        socket.emit("private message", salas)

        socket.on('select_sala', )
    })
}
