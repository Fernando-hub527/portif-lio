import mongoose from "../../infra/database/connections";

const schemaUser = new mongoose.Schema({
    cracha: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    perfil: {
        type: String,
        require: true
    },
    modulosId: {
        type: Array<Number>(),
        require: true
    }
})

const user = mongoose.model("user", schemaUser)
export default user