import dotenv from 'dotenv'
import { escolheAmbiente } from '../../../utils/encontraAmbiente'
const mongoose = require('mongoose')

const ambiente = escolheAmbiente(String(process.env.NODE_ENV))

if (ambiente !== 'prod') {
  dotenv.config({
    path: ambiente
  })
}

mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`,
 {
  useNewUrlParser: true
})
export default mongoose