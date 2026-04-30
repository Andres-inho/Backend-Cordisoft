import { conexionDb } from "../conexionDb/ConexionDb.js"

export const materialesDaniados = async (req, resp) => {

}

export const usuariosDaniados = async (req, resp) => {
    const sql = `SELECT 
                a.nombre,
                COUNT(*) + 0 AS total_danios
                FROM detallesolicitud ds
                JOIN aprendices a ON ds.id_aprendiz = a.id_aprendiz
                WHERE ds.estado_item = 'dañado'
                GROUP BY a.id_aprendiz
                ORDER BY total_danios DESC
                LIMIT 10;`
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const materialesPorMes = async (req, resp) => {
    const sql = `SELECT 
                m.nombre,
                MONTH(s.fecha_creacion) as mes,
                COUNT(*) as total
                FROM detallesolicitud ds
                JOIN material m ON ds.id_material = m.id_material
                JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
                GROUP BY m.nombre, mes
                ORDER BY total DESC;`
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const morosos = async (req, resp) => {
    
}