import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasFichas= express.Router()

import { crearFicha } from '../controllers/controllerFicha.js'
rutasFichas.post('/crear',validarToken,crearFicha)

import { listarFicha } from '../controllers/controllerFicha.js'
rutasFichas.get('/listar',validarToken,listarFicha)

import { editarFicha } from '../controllers/controllerFicha.js'
rutasFichas.put('/editar/:id',validarToken,editarFicha)

import { eliminarFicha } from '../controllers/controllerFicha.js'
rutasFichas.delete('/eliminar/:id',validarToken,eliminarFicha)

import { buscarFicha } from '../controllers/controllerFicha.js'
rutasFichas.get('/buscar/:id',validarToken,buscarFicha)


export default rutasFichas