import express from 'express';
export const rutasWhatsapp = express.Router();
import {guardarSesion, verificarSesion, cerrarSesion, obtenerEstado, guardarEstado} from '../controllers/sesionWhatsappController.js'

rutasWhatsapp.post('/guardar', guardarSesion);
rutasWhatsapp.get('/verificar/:telefono', verificarSesion);
rutasWhatsapp.delete('/cerrar/:telefono', cerrarSesion);
rutasWhatsapp.get('/estado/:telefono', obtenerEstado);
rutasWhatsapp.post('/estado/guardar', guardarEstado)
