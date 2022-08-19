import dotenv from 'dotenv'
const mongoose = require('mongoose')


mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true })
mongoose.Promise = global.Promise

export default mongoose