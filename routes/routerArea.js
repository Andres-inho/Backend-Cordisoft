import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasArea= express.Router()

import { crearArea } from '../controllers/controllerArea.js'
rutasArea.post('/crear',validarToken,crearArea)

import { listarArea } from '../controllers/controllerArea.js'
rutasArea.get('/listar',validarToken,listarArea)

import { editarArea } from '../controllers/controllerArea.js'
rutasArea.put('/editar/:id',validarToken,editarArea)

import { eliminarArea } from '../controllers/controllerArea.js'
rutasArea.delete('/eliminar/:id',validarToken,eliminarArea)

import { buscarArea } from '../controllers/controllerArea.js'
rutasArea.get("/buscar/:texto",validarToken, buscarArea)


export default rutasArea;