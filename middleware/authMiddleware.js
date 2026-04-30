import jwt from "jsonwebtoken"

export const validarToken = (req, resp, next) => {
    const header = req.headers.authorization

    if (!header) {
        return resp.status(401).json({ msg: "Token no enviado" })
    }

    const token = header.split(" ")[1]

    if (!token) {
        return resp.status(401).json({ msg: "Token inválido" })
    }

    try {
        const decodificado = jwt.verify(token, "ADSO3063316")
        req.user = decodificado
        next()
    } catch (error) {
        return resp.status(401).json({ msg: "Token inválido o expirado" })
    }
}
