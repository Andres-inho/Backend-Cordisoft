import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasMovimientoInventario= express.Router()

import { crearMovimiento } from '../controllers/controllerMovimientoInventario.js'
rutasMovimientoInventario.post('/crear',validarToken,crearMovimiento)

import { listarMovimiento } from '../controllers/controllerMovimientoInventario.js'
rutasMovimientoInventario.get('/listar',validarToken,listarMovimiento)

import { editarMovimiento } from '../controllers/controllerMovimientoInventario.js'
rutasMovimientoInventario.put('/editar/:id',validarToken,editarMovimiento)

import { eliminarMovimiento } from '../controllers/controllerMovimientoInventario.js'
rutasMovimientoInventario.delete('/eliminar/:id',validarToken,eliminarMovimiento)

import { buscarMovimiento } from '../controllers/controllerMovimientoInventario.js'
rutasMovimientoInventario.get('/buscar/:id',validarToken,buscarMovimiento)


export default rutasMovimientoInventario;