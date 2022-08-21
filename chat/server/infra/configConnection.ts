import dotenv from 'dotenv'
const mongoose = require('mongoose')
dotenv.config({path: "./server/env/dev/.env"})

console.log(process.env.DB_URL)
mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true })
mongoose.Promise = global.Promise

export default mongoose