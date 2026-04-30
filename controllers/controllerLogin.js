import {conexionDb} from "../conexionDb/conexionDb.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const createAuth=async(req,resp)=>{
    const{correo_electronico,contraseña}=req.body
    const sql="select usuario.id_usuario,usuario.nombre,usuario.contraseña,rol.nombre as rol from usuario join rol on usuario.id_rol = rol.id_rol where usuario.correo_electronico=? "
    const [respuesta]= await conexionDb.query(sql,[correo_electronico])

    const usuario=respuesta[0];

    if(!usuario){
        return resp.status(401).json({msg:"Usuario no valido"})
}

    const validar= await bcrypt.compare(contraseña,usuario.contraseña)
    if(!validar){
        return resp.status(401).json({msg:"La contraseña es incorrecta"})
    }

    const token=jwt.sign(
        {
            id:usuario.id_usuario,
            rol:usuario.rol
        },
        "ADSO3063316",
        {
            expiresIn:"10h"
        }
    )

    resp.status(200).json({token,
        user:{
            id:usuario.id_usuario,
            nombre:usuario.nombre,
            rol:usuario.rol
            

        }
    });

}

