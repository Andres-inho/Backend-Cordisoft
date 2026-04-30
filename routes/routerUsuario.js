import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasUsuarios= express.Router()

import { crearUsuario } from '../controllers/controllerUsuario.js'
rutasUsuarios.post('/crear', validarToken, crearUsuario)


import { listarUsuario } from '../controllers/controllerUsuario.js'
rutasUsuarios.get('/listar',validarToken,listarUsuario)

import { editarUsuario } from '../controllers/controllerUsuario.js'
rutasUsuarios.put('/editar/:id',validarToken,editarUsuario)

import { eliminarUsuario } from '../controllers/controllerUsuario.js'
rutasUsuarios.delete('/eliminar/:id',validarToken,eliminarUsuario)

import { buscarUsuario } from '../controllers/controllerUsuario.js'
rutasUsuarios.get('/buscar/:valor',validarToken,buscarUsuario)




export default rutasUsuarios