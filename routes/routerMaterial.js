import express from 'express'
import { validarToken } from '../middleware/authMiddleware.js'

const rutasMateriales= express.Router()

import { crearMaterial } from '../controllers/controllerMaterial.js'
rutasMateriales.post('/crear',validarToken,crearMaterial)

import { listarMaterial } from '../controllers/controllerMaterial.js'
rutasMateriales.get('/listar',validarToken,listarMaterial)

import { editarMaterial } from '../controllers/controllerMaterial.js'
rutasMateriales.put('/editar/:id',validarToken,editarMaterial)

import { eliminarMaterial } from '../controllers/controllerMaterial.js'
rutasMateriales.delete('/eliminar/:id',validarToken,eliminarMaterial)

import { buscarMaterial } from '../controllers/controllerMaterial.js'
rutasMateriales.get('/buscar/:valor',validarToken,buscarMaterial)


export default rutasMateriales