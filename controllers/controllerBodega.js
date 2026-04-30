import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearBodega = async (req, resp) => {
    const { nombre, ubicacion, estado, id_area } = req.body
    const sql = "insert into bodega (nombre, ubicacion, estado, id_area) values(?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [nombre, ubicacion, estado, id_area])
    resp.status(200).json(resultado)
}

export const listarBodega = async (req, resp) => {
    const sql = "select * from bodega"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarBodega = async (req, resp) => {
    const { id } = req.params
    const { nombre, ubicacion, estado, id_area } = req.body
    const sql = "update bodega set nombre=?, ubicacion=?, estado=?, id_area=? where id_bodega=?"
    const [resultado] = await conexionDb.query(sql, [nombre, ubicacion, estado, id_area, id])
    resp.status(200).json(resultado)
}

export const eliminarBodega = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from bodega where id_bodega=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarBodega = async (req, resp) => {
    const { valor } = req.params
    const sql = "select * from bodega where id_bodega=? or nombre like ? or ubicacion like ?"
    const [resultado] = await conexionDb.query(sql, [valor, `%${valor}%`, `%${valor}%`])
    resp.status(200).json(resultado)
}