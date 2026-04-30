import express from 'express';
export const rutasWhatsapp = express.Router();
import {guardarSesion, verificarSesion, cerrarSesion} from '../controllers/sesionWhatsappController.js'

rutasWhatsapp.post('/guardar', guardarSesion);
rutasWhatsapp.get('/verificar/:telefono', verificarSesion);
rutasWhatsapp.delete('/cerrar/:telefono', cerrarSesion);
