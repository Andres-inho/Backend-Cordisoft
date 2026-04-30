import { conexionDb } from "../conexionDb/ConexionDb.js";

export const guardarSesion = async (req, res) => {
  const { telefono, token, id_usuario, expires_at } = req.body;

  if (!telefono || !token || !id_usuario) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  try {
    // Si ya existe una sesión para ese teléfono, la actualiza
    const [existe] = await conexionDb.query(
      'SELECT id_sesion FROM sesion_whatsapp WHERE telefono = ?',
      [telefono]
    );

    if (existe.length > 0) {
      await conexionDb.query(
        'UPDATE sesion_whatsapp SET token = ?, id_usuario = ?, creado_en = NOW(), expires_at = ? WHERE telefono = ?',
        [token, id_usuario, expires_at || null, telefono]
      );
    } else {
      await conexionDb.query(
        'INSERT INTO sesion_whatsapp (telefono, id_usuario, token, expires_at) VALUES (?, ?, ?, ?)',
        [telefono, id_usuario, token, expires_at || null]
      );
    }

    res.json({ mensaje: 'Sesión guardada correctamente' });
  } catch (error) {
    console.error('Error guardando sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const verificarSesion = async (req, res) => {
  const { telefono } = req.params;

  try {
    const [rows] = await conexionDb.query(
      `SELECT s.token, s.id_usuario, s.expires_at, u.nombre, u.id_rol, r.nombre AS rol
       FROM sesion_whatsapp s
       JOIN usuario u ON s.id_usuario = u.id_usuario
       JOIN rol r ON u.id_rol = r.id_rol
       WHERE s.telefono = ?`,
      [telefono]
    );

    if (rows.length === 0) {
      return res.status(404).json({ activa: false, mensaje: 'Sin sesión activa' });
    }

    const sesion = rows[0];

    // Verificar expiración si existe
    if (sesion.expires_at && new Date(sesion.expires_at) < new Date()) {
      await conexionDb.query('DELETE FROM sesion_whatsapp WHERE telefono = ?', [telefono]);
      return res.status(401).json({ activa: false, mensaje: 'Sesión expirada' });
    }

    res.json({
      activa: true,
      token: sesion.token,
      id_usuario: sesion.id_usuario,
      nombre: sesion.nombre,
      id_rol: sesion.id_rol,
      rol: sesion.rol
    });
  } catch (error) {
    console.error('Error verificando sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const cerrarSesion = async (req, res) => {
  const { telefono } = req.params;

  try {
    await conexionDb.query('DELETE FROM sesion_whatsapp WHERE telefono = ?', [telefono]);
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerEstado = async (req, res) => {
  const { telefono } = req.params;
  try {
    const [rows] = await conexionDb.query(
      'SELECT paso, correo FROM estado_login_whatsapp WHERE telefono = ?',
      [telefono]
    );
    if (rows.length === 0) {
      // Primera vez que escribe — crear estado inicial
      await conexionDb.query(
        'INSERT INTO estado_login_whatsapp (telefono, paso) VALUES (?, "esperando_correo")',
        [telefono]
      );
      return res.json({ paso: 'esperando_correo', correo: null });
    }
    res.json({ paso: rows[0].paso, correo: rows[0].correo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};

export const guardarEstado = async (req, res) => {
  const { telefono, paso, correo } = req.body;
  try {
    await conexionDb.query(
      `INSERT INTO estado_login_whatsapp (telefono, paso, correo) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE paso = VALUES(paso), correo = VALUES(correo)`,
      [telefono, paso, correo || null]
    );
    res.json({ mensaje: 'Estado guardado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};