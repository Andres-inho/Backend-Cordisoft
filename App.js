import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const servidor = express();

servidor.use(bodyParser.json())
servidor.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

import rutasArea from './routes/routerArea.js';
servidor.use('/areas',rutasArea)

import rutasRoles from './routes/routerRol.js';
servidor.use('/roles',rutasRoles)

import rutasUsuarios from './routes/routerUsuario.js';
servidor.use('/usuarios',rutasUsuarios)

import rutasFichas from './routes/routerFicha.js';
servidor.use('/fichas',rutasFichas)

import rutasMateriales from './routes/routerMaterial.js';
servidor.use('/materiales',rutasMateriales)

import rutasBodegas from './routes/routerBodega.js';
servidor.use('/bodegas',rutasBodegas)

import rutasAprendices from './routes/routerAprendiz.js';
servidor.use('/aprendices',rutasAprendices)

import rutasMovimientoInventario from './routes/routerMovimientoInventario.js';
servidor.use('/movimientos',rutasMovimientoInventario)

import rutasSolicitudes from './routes/routerSolicitud.js';
servidor.use('/solicitudes',rutasSolicitudes)

import rutasDetalleSolicitud from './routes/routerDetalleSolicitud.js';
servidor.use('/detalleSolicitudes',rutasDetalleSolicitud)

import routeAuth from './routes/routerLogin.js';
servidor.use("/login",routeAuth)

import rutasEstadisticas from './routes/routerEstadisticas.js';
servidor.use("/estadisticas",rutasEstadisticas)

import { rutasReportes } from './routes/routerReportes.js';
servidor.use("/reportes", rutasReportes)



servidor.listen(3000,()=>{
    console.log("Servidor corriendo en el puerto 3000")

})
