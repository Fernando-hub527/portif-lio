import mongoose from "../../infra/database/connections";

const schemaModulo = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    }
})

const modulo = mongoose.model("modulo", schemaModulo)
export default modulo