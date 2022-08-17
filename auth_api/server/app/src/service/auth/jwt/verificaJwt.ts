import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { escolheAmbiente } from '../../../../../utils/encontraAmbiente'

const ambiente = escolheAmbiente(String(process.env.NODE_ENV))
if (ambiente !== 'prod') {
  dotenv.config({
    path: ambiente
  })
}
export default function verifyJWT (req: Request, res: Response, next: any) {
  let token = req.headers.authorization
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })
  token = token.replace('Bearer ', '')

  const key = Buffer.from(process.env.SECRET_KEY!, 'base64')
  jwt.verify(String(token), key as Secret, function (err, decoded) {
    if (err) return res.status(403).json({ error: 'Failed to authenticate token.' })
    req.params.userId = (decoded as {userId:string}).userId
    next()
  })
}
