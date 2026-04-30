import { conexionDb } from "../conexionDb/ConexionDb.js";

export const crearSolicitud = async (req, resp) => {
    const { id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado } = req.body
    const sql = "insert into solicitud (id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado) values(?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado || 'pendiente'])
    const idSolicitud = resultado.insertId
    if (tipo_solicitud === 'prestamo') {
        const sqlPrestamo = `INSERT INTO prestamo (id_solicitud, fecha_inicio, estado_prestamo) VALUES (?,?,?)`
        await conexionDb.query(sqlPrestamo, [
            idSolicitud, fecha_creacion, 'pendiente'
        ])
    }
    resp.status(200).json({resultado, id_solicitud: idSolicitud})
}

export const listarSolicitud = async (req, resp) => {
    const sql = "select * from solicitud"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarSolicitud = async (req, resp) => {
    const { id } = req.params
    const { id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado } = req.body
    const sql = "update solicitud set id_usuario=?, tipo_solicitud=?, fecha_creacion=?, fecha_entrega=?, estado=? where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado, id])
    
    // Activar préstamo si se aprueba desde Administrador
    if (tipo_solicitud?.toLowerCase() === 'prestamo' && estado === 'Aprobada') {
        const sqlPrestamo = "update prestamo set estado_prestamo='activo' where id_solicitud=? and estado_prestamo='pendiente'";
        await conexionDb.query(sqlPrestamo, [id]);
    }
    
    resp.status(200).json(resultado)
}

export const eliminarSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from solicitud where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from solicitud where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const devolverPrestamo = async (req, resp) => {
    const {id_solicitud} = req.body
    const sql = `UPDATE prestamo SET estado_prestamo = 'devuelto', fecha_fin = NOW() WHERE  id_solicitud = ?`
    await conexionDb.query(sql,[id_solicitud])
    const sqlDetalle = `UPDATE detallesolicitud SET estado_item = 'devuelto' WHERE id_solicitud = ? AND estado_item != 'dañado'`
    await conexionDb.query(sqlDetalle,[id_solicitud])
    resp.status(200).json({mensaje: "Prestamo devuelto correctamente"})
}

export const listarSolcitudConPrestamo = async (req, resp) => {
    const sql = `SELECT s.*, p.estado_prestamo, p.fecha_inicio, p.fecha_fin FROM solicitud s LEFT JOIN prestamo p ON s.id_solicitud = p.id_solicitud`
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}