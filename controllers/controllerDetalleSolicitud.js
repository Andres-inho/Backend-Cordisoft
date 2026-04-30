import { conexionDb } from "../conexionDb/ConexionDb.js";

export const crearDetalleSolicitud = async (req, resp) => {
    const { id_solicitud, id_material, cantidad, id_aprendiz } = req.body
    const sql = "insert into detallesolicitud (id_solicitud, id_material, cantidad, id_aprendiz) values(?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [id_solicitud, id_material, cantidad, id_aprendiz])
    resp.status(200).json(resultado)
}

export const listarDetalleSolicitud = async (req, resp) => {
    const sql = "select * from detallesolicitud"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const { estado_item } = req.body
    const sql = "update detallesolicitud set estado_item = ? where id_detalle = ? "
    if (req.user.rol !== 'Administrador') {
        return resp.status(403).json({mensaje: "No autorizado"})
    }
    const [resultado] = await conexionDb.query(sql, [estado_item, id])
    resp.status(200).json(resultado)
}

export const eliminarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from detallesolicitud where id_detalle=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from detallesolicitud where id_detalle=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}