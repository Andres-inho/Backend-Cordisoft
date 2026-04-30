import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearMovimiento = async (req, resp) => {
    const { id_usuario, id_solicitud, id_material, cantidad, estado, fecha, tipoMovimiento } = req.body
    const sql = "insert into movimientoinventario (id_usuario, id_solicitud, id_material, cantidad, estado, fecha, tipoMovimiento) values(?,?,?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [id_usuario, id_solicitud, id_material, cantidad, estado, fecha, tipoMovimiento])
    resp.status(200).json(resultado)
}

export const listarMovimiento = async (req, resp) => {
    const sql = "select * from movimientoinventario"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarMovimiento = async (req, resp) => {
    const { id } = req.params
    const { id_usuario, id_solicitud, id_material, cantidad, estado, fecha, tipoMovimiento } = req.body
    const sql = "update movimientoinventario set id_usuario=?, id_solicitud=?, id_material=?, cantidad=?, estado=?, fecha=?, tipoMovimiento=? where id_movimiento=?"
    const [resultado] = await conexionDb.query(sql, [id_usuario, id_solicitud, id_material, cantidad, estado, fecha, tipoMovimiento, id])
    resp.status(200).json(resultado)
}

export const eliminarMovimiento = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from movimientoinventario where id_movimiento=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarMovimiento = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from movimientoinventario where id_movimiento=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}