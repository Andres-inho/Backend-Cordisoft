import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasDetallesSolicitudes= express.Router()

import { crearDetalleSolicitud } from '../controllers/controllerDetalleSolicitud.js'
rutasDetallesSolicitudes.post('/crear',validarToken,crearDetalleSolicitud)

import { listarDetalleSolicitud } from '../controllers/controllerDetalleSolicitud.js'
rutasDetallesSolicitudes.get('/listar',validarToken,listarDetalleSolicitud)

import { editarDetalleSolicitud } from '../controllers/controllerDetalleSolicitud.js'
rutasDetallesSolicitudes.put('/editar/:id',validarToken,editarDetalleSolicitud)

import { eliminarDetalleSolicitud } from '../controllers/controllerDetalleSolicitud.js'
rutasDetallesSolicitudes.delete('/eliminar/:id',validarToken,eliminarDetalleSolicitud)

import { buscarDetalleSolicitud } from '../controllers/controllerDetalleSolicitud.js'
rutasDetallesSolicitudes.get('/buscar/:id',validarToken,buscarDetalleSolicitud)


export default rutasDetallesSolicitudes;