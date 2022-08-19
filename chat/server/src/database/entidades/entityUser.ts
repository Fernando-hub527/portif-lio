import mongoose from '../../../infra/configConnection'

const userSchema = new mongoose.Schema({
    nameUser: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    }
  })
  
  export default mongoose.model('user', userSchema)
  