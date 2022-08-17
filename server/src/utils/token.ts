import jwt from "jsonwebtoken"

export function gerarToken (payload: Object, secret: String) {
  const key = Buffer.from(secret, 'base64')
  const token = jwt.sign(payload, key)
  return `Bearer ${token}`
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