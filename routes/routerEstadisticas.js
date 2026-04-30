import express from 'express'
import {
    materialesNoDevueltos,
    materialesMasDaniados,
    usuariosMorosos,
    materialesMasPrestados
} from '../controllers/controllerEstadisticas.js'

const rutasEstadisticas = express.Router()

rutasEstadisticas.get('/materialesNoDevueltos', materialesNoDevueltos)
rutasEstadisticas.get('/materialesDanados', materialesMasDaniados)
rutasEstadisticas.get('/usuariosMorosos', usuariosMorosos)
rutasEstadisticas.get('/materialesMasPrestados', materialesMasPrestados)

export default rutasEstadisticas