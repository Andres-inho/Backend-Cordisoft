import { conexionDb } from "../conexionDb/ConexionDb.js";

export const crearAprendiz = async (req, resp) => {
    const { nombre, documento, id_ficha } = req.body
    const sql = "insert into aprendiz (nombre, documento, id_ficha) values(?,?,?)"
    const [resultado] = await conexionDb.query(sql, [nombre, documento, id_ficha])
    resp.status(200).json(resultado)
}

export const listarAprendiz = async (req, resp) => {
    const sql = "select * from aprendiz"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarAprendiz = async (req, resp) => {
    const { id } = req.params
    const { nombre, documento, id_ficha } = req.body
    const sql = "update aprendiz set nombre=?, documento=?, id_ficha=? where id_aprendiz=?"
    const [resultado] = await conexionDb.query(sql, [nombre, documento, id_ficha, id])
    resp.status(200).json(resultado)
}

export const eliminarAprendiz = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from aprendiz where id_aprendiz=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarAprendiz = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from aprendiz where id_aprendiz=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}