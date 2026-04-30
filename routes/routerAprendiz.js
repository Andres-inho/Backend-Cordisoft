import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasAprendices= express.Router()

import { crearAprendiz } from '../controllers/controllerAprendiz.js'
rutasAprendices.post('/crear',validarToken,crearAprendiz)

import { listarAprendiz } from '../controllers/controllerAprendiz.js'
rutasAprendices.get('/listar',validarToken,listarAprendiz)

import { editarAprendiz } from '../controllers/controllerAprendiz.js'
rutasAprendices.put('/editar/:id',validarToken,editarAprendiz)

import { eliminarAprendiz } from '../controllers/controllerAprendiz.js'
rutasAprendices.delete('/eliminar/:id',validarToken,eliminarAprendiz)

import { buscarAprendiz } from '../controllers/controllerAprendiz.js'
rutasAprendices.get('/buscar/:id',validarToken,buscarAprendiz)


export default rutasAprendices;