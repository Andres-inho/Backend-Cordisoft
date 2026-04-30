import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasRoles= express.Router()

import { crearRol } from '../controllers/controllerRol.js'
rutasRoles.post('/crear',validarToken,crearRol)

import { listarRol } from '../controllers/controllerRol.js'
rutasRoles.get('/listar',validarToken,listarRol)

import { editarRol } from '../controllers/controllerRol.js'
rutasRoles.put('/editar/:id',validarToken,editarRol)

import { eliminarRol } from '../controllers/controllerRol.js'
rutasRoles.delete('/eliminar/:id',validarToken,eliminarRol)

import { buscarRol } from '../controllers/controllerRol.js'
rutasRoles.get('/buscar/:id',validarToken,buscarRol)


export default rutasRoles