import express from 'express';
export const rutasWhatsapp = express.Router();
const { guardarSesion, verificarSesion, cerrarSesion } = require('../controllers/sesionWhatsappController');

rutasWhatsapp.post('/guardar', guardarSesion);
rutasWhatsapp.get('/verificar/:telefono', verificarSesion);
rutasWhatsapp.delete('/cerrar/:telefono', cerrarSesion);
