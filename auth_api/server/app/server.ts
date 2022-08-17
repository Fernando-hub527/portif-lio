import dotenv from 'dotenv'
const ambiente = escolheAmbiente(String(process.env.NODE_ENV))
if (ambiente !== 'prod')dotenv.config({path: ambiente})
import "reflect-metadata"
import { escolheAmbiente } from "../utils/encontraAmbiente";
import { AplicationManager } from "./src/api/AplicationManager";

let app = new AplicationManager()
app.start(3031)