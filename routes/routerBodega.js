import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasBodegas= express.Router()

import { crearBodega } from '../controllers/controllerBodega.js'
rutasBodegas.post('/crear',validarToken,crearBodega)

import { listarBodega } from '../controllers/controllerBodega.js'
rutasBodegas.get('/listar',validarToken,listarBodega)

import { editarBodega } from '../controllers/controllerBodega.js'
rutasBodegas.put('/editar/:id',validarToken,editarBodega)

import { eliminarBodega } from '../controllers/controllerBodega.js'
rutasBodegas.delete('/eliminar/:id',validarToken,eliminarBodega)

import { buscarBodega } from '../controllers/controllerBodega.js'
rutasBodegas.get('/buscar/:valor',validarToken,buscarBodega)


export default rutasBodegas