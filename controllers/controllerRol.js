import { conexionDb } from "../conexionDb/ConexionDb.js";

export const crearRol=async(req,resp)=>{
    const {nombre}=req.body
    const sql="insert into rol (nombre) values(?)"
    const [resultado]=await conexionDb.query(sql,[nombre])
    resp.status(200).json(resultado)
}

export const listarRol=async(req,resp)=>{
    const sql="select * from rol"
    const [resultado]= await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarRol=async(req,resp)=>{
    const {id}=req.params
    const {nombre}=req.body
    const sql="update rol set nombre? where id_rol=?"
    const [resultado]=await conexionDb.query(sql,[nombre,id])
    resp.status(200).json(resultado)
}

export const eliminarRol=async(req,resp)=>{
    const {id}=req.params
    const sql= "delete from rol where id_rol=?"
    const [resultado]=await conexionDb.query(sql,[id])
    resp.status(200).json(resultado)
}

export const buscarRol=async(req,resp)=>{
    const {id}=req.params
    const sql="select * from rol where id_rol=?"
    const [resultado]=await conexionDb.query(sql,[id])
    resp.status(200).json(resultado)
}