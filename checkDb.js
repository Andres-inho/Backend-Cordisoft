import { createPool } from "mysql2/promise";

const conexionDb = createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "cordisoft"
});

async function check() {
  try {
    const [solicitudes] = await conexionDb.query("SELECT id_solicitud, tipo_solicitud, estado FROM solicitud ORDER BY id_solicitud DESC LIMIT 5");
    const [prestamos] = await conexionDb.query("SELECT * FROM prestamo ORDER BY id_solicitud DESC LIMIT 5");
    
    console.log("--- ULTIMAS SOLICITUDES ---");
    console.table(solicitudes);

    const [schema] = await conexionDb.query("SHOW CREATE TABLE prestamo");
    console.log(schema[0]['Create Table']);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}
check();
