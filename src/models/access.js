import { conexion } from '../database/database-conector.js';
import { generateId } from "../utils/utils.js";

export async function obtenerAccesos() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM acceso;`;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(resultados[0]));
      }
    });
  });
}

export async function agregarAcceso(empleadoId, fecha_hora) {
  return new Promise(async (resolve, reject) => {
    const accesoId = generateId();
    const intentarAgregarAcceso = async () => {
      const accesoExistente = await getByIdAcceso(accesoId);
      if (!accesoExistente) {
        const sqlAcceso = `INSERT INTO Acceso (acceso_id, empleado_id, fecha_hora) VALUES (?, ?, ?)`;
        conexion.query(sqlAcceso, [accesoId, empleadoId, fecha_hora], (errorAcceso, resultadoAcceso) => {
          if (errorAcceso) {
            reject(errorAcceso);
          } else {
            resolve({
              acceso_id: accesoId,
              empleado_id: empleadoId,
              fecha_hora: fecha_hora
            });
          }
        });
      } else {
        intentarAgregarAcceso();
      }
    };
    intentarAgregarAcceso();
  });
}

export async function getByIdAcceso(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Acceso WHERE acceso_id = ?`;
    conexion.query(sql, [id], (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(resultados[0]);
      }
    });
  });
}

export async function getByEmployeeAcceso(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Acceso WHERE empleado_id = ?`;
    conexion.query(sql, [id], (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}