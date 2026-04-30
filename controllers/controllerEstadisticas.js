import { conexionDb } from "../conexionDb/conexionDb.js";


export const materialesNoDevueltos = async (req, resp) => {
    const sql = `
    SELECT m.nombre AS name, COUNT(*) AS cantidad
    FROM detallesolicitud ds
    JOIN material m ON ds.id_material = m.id_material
    WHERE ds.estado_item != 'devuelto'
    GROUP BY m.id_material, m.nombre;
    `
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}


export const materialesMasDaniados = async (req, resp) => {
    const sql = `
        SELECT 
        m.nombre as name, 
        CAST(SUM(ds.cantidad) AS SIGNED) as valor
    FROM detallesolicitud ds
    JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
    JOIN prestamo p ON p.id_solicitud = s.id_solicitud
    JOIN material m ON ds.id_material = m.id_material
    WHERE ds.estado_item = 'dañado'
    AND p.estado_prestamo = 'devuelto'
    AND s.tipo_solicitud = 'prestamo'
    GROUP BY m.id_material, m.nombre
    ORDER BY valor DESC
    LIMIT 10
    `

    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}


export const usuariosMorosos = async (req, resp) => {
    const sql = `
        SELECT u.nombre as name, COUNT(*) as pendientes
        FROM solicitud s
        JOIN usuario u ON s.id_usuario = u.id_usuario
        JOIN prestamo p ON s.id_solicitud = p.id_solicitud
        WHERE p.estado_prestamo = 'activo'
        GROUP BY u.id_usuario, u.nombre
        ORDER BY pendientes DESC
        LIMIT 10
    `
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}


export const materialesMasPrestados = async (req, resp) => {
    const sql = `
        SELECT m.nombre as name, COUNT(*) as prestamos
        FROM detallesolicitud ds
        JOIN material m ON ds.id_material = m.id_material
        JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
        WHERE s.tipo_solicitud = 'prestamo'
        GROUP BY m.id_material, m.nombre
        ORDER BY prestamos DESC
        LIMIT 10
    `
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}