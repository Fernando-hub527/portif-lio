import jwt from "jsonwebtoken"
import { TokenJwtDTO } from "../dto/TokenJwtDTO"

export function gerarToken (payload: Object, secret: String) {
  const key = Buffer.from(secret, 'base64')
  const token = jwt.sign(payload, key)
  return new TokenJwtDTO(`Bearer ${token}`)
}

export function verificarTorken(token: String | undefined, key: Buffer){
  if (!token) return { auth: false, message: 'No token provided.' }

  let tokenMod = token.replace('Bearer ', '')
  return new Promise((resolve, reject) => {
    jwt.verify(tokenMod, key, (error, decoded) => {
      if(error) resolve(false)
      else resolve(decoded)
    })
  })
}