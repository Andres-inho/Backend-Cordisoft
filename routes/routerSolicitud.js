import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasSolicitudes= express.Router()

import { crearSolicitud } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.post('/crear',validarToken,crearSolicitud)

import { listarSolicitud } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.get('/listar',validarToken,listarSolicitud)

import { editarSolicitud } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.put('/editar/:id',validarToken,editarSolicitud)

import { eliminarSolicitud } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.delete('/eliminar/:id',validarToken,eliminarSolicitud)

import { buscarSolicitud } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.get('/buscar/:id',validarToken,buscarSolicitud)

import { devolverPrestamo } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.post('/prestamo/devolver', devolverPrestamo)

import { listarSolcitudConPrestamo } from '../controllers/controllerSolicitud.js'
rutasSolicitudes.get('/listar/prestamo', listarSolcitudConPrestamo)


export default rutasSolicitudes