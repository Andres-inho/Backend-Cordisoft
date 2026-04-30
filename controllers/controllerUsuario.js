import { conexionDb } from "../conexionDb/conexionDb.js";
import bcrypt from "bcryptjs"

export const crearUsuario = async (req, resp) => {
    const { correo_electronico, identificacion, nombre, apellidos, estado, id_rol, contraseña } = req.body
    const contraseñaEncrypt=await bcrypt.hash(contraseña,8)
    const sql = "insert into usuario (correo_electronico, identificacion, nombre, apellidos, estado, id_rol, contraseña) values(?,?,?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [correo_electronico, identificacion, nombre, apellidos, estado, id_rol, contraseñaEncrypt])
    resp.status(200).json(resultado)
}

export const listarUsuario = async (req, resp) => {
    const sql = "select * from usuario"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarUsuario = async (req, resp) => {
    const { id } = req.params
    const { correo_electronico, identificacion, nombre, apellidos, estado, id_rol, contraseña } = req.body
    const sql = "update usuario set correo_electronico=?, identificacion=?, nombre=?, apellidos=?, estado=?, id_rol=?, contraseña=? where id_usuario=?"
    const [resultado] = await conexionDb.query(sql, [correo_electronico, identificacion, nombre, apellidos, estado, id_rol, contraseña, id])
    resp.status(200).json(resultado)
}

export const eliminarUsuario = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from usuario where id_usuario=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarUsuario = async (req, resp) => {
    const { valor } = req.params
    const sql = "select * from usuario where id_usuario=? or nombre like ? or correo_electronico like ?"
    const [resultado] = await conexionDb.query(sql, [valor, `%${valor}%`, `%${valor}%`])
    resp.status(200).json(resultado)
}