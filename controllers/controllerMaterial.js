import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearMaterial = async (req, resp) => {
    const { nombre, codigo, tipo, estado, descripcion, id_area, cantidad, id_bodega, id_ficha } = req.body
    const sql = "insert into material (nombre, codigo, tipo, estado, descripcion, id_area, cantidad, id_bodega, id_ficha) values(?,?,?,?,?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [nombre, codigo, tipo, estado, descripcion, id_area, cantidad, id_bodega, id_ficha])
    resp.status(200).json(resultado)
}

export const listarMaterial = async (req, resp) => {
    const sql = "select * from material"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarMaterial = async (req, resp) => {
    const { id } = req.params
    const { nombre, codigo, tipo, estado, descripcion, id_area, cantidad, id_bodega, id_ficha } = req.body
    const sql = "update material set nombre=?, codigo=?, tipo=?, estado=?, descripcion=?, id_area=?, cantidad=?, id_bodega=?, id_ficha=? where id_material=?"
    const [resultado] = await conexionDb.query(sql, [nombre, codigo, tipo, estado, descripcion, id_area, cantidad, id_bodega, id_ficha, id])
    resp.status(200).json(resultado)
}

export const eliminarMaterial = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from material where id_material=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarMaterial = async (req, resp) => {
    const { valor } = req.params
    const sql = "select * from material where id_material=? or nombre like ? or descripcion like ?"
    const [resultado] = await conexionDb.query(sql, [valor, `%${valor}%`, `%${valor}%`])
    resp.status(200).json(resultado)
}