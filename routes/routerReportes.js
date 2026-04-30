import express from 'express';
import { validarToken } from '../middleware/authMiddleware.js';

export const rutasReportes = express.Router()

import { materialesDaniados } from '../controllers/controllerReportes.js';
rutasReportes.get('/listar', validarToken, materialesDaniados)