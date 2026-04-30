import { conexionDb } from "../conexionDb/ConexionDb.js";

export const crearArea=async(req,resp)=>{
    const {descripcion,nombre,estado,id_usuario}=req.body
    const sql="insert into areas (nombre,estado,id_usuario,descripcion) values(?,?,?,?)"
    const [respuesta]= await conexionDb.query(sql,[nombre,estado,id_usuario,descripcion])
    resp.status(200).json(respuesta)
}

export const listarArea=async(req,resp)=>{
    const sql= "SELECT a.id_area, a.nombre, a.estado, a.descripcion, a.id_usuario, u.nombre AS usuario_nombre FROM areas a LEFT JOIN usuario u ON a.id_usuario = u.id_usuario;"
    const [respuesta]=await conexionDb.query(sql)
    resp.status(200).json(respuesta)


}

export const editarArea=async(req,resp)=>{
    const {id}=req.params
    const {descripcion,nombre,estado,id_usuario}=req.body
    const sql="update areas set descripcion=?,nombre=?,estado=?,id_usuario=? where id_area=?"
    const [respuesta]=await conexionDb.query(sql,[descripcion,nombre,estado,id_usuario,id])
    resp.status(200).json(respuesta)

}


export const eliminarArea=async(req,resp)=>{
    const{id}=req.params
    const sql="delete from areas where id_area=?"
    const [resultado]=await conexionDb.query(sql,[id])
    resp.status(200).json(resultado)
}

    export const buscarArea = async (req, resp) => {

    try{

        const { texto } = req.params

        const sql = `
        SELECT a.id_area, a.nombre, a.estado, a.descripcion, a.id_usuario, u.nombre AS usuario_nombre
        FROM areas a
        LEFT JOIN usuario u ON a.id_usuario = u.id_usuario
        WHERE a.nombre LIKE ?
        `

        const [respuesta] = await conexionDb.query(sql, [`%${texto}%`])

        resp.json(respuesta)

    }catch(error){

        console.error(error)
        resp.status(500).json({mensaje:"Error buscando áreas"})

    }

    }