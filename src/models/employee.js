import { conexion } from '../database/database-conector.js';

// obtiene empleados
export async function obtenerEmpleados() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT e.empleado_id, e.nombre, e.apellido, e.telf, u.email
      FROM empleado e
      JOIN usuario u ON e.usuario_id = u.usuario_id
      WHERE u.role = 'EMPLEADO';
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(resultados[0]));
      }
    });
  });
}

// Actualiza la informacion del usuario
export async function actualizarEmpleado(id, nombre, apellido, telf) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE empleado SET nombre = ?, apellido = ?, telf = ? WHERE usuario_id = ?`;
    conexion.query(sql, [nombre, apellido, telf, id], (error, resultado) => {
      if (error) {
        reject(error);
      } else {
        // Aquí resolvemos la Promesa con la información del empleado actualizado
        console.log(resultado[0]);
        resolve({ mensaje: 'Empleado actualizado correctamente' });
      }
    });
  });
}

// Consulta empleado por id
export async function getById(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM empleado WHERE empleado_id = ?`;
    conexion.query(sql, [id], (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(resultados[0]));
      }
    });
  });
}

// elimina empleado por id
export async function eliminarEmpleado(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM empleado WHERE usuario_id = ?`;
    conexion.query(sql, [id], (error, resultado) => {
      if (error) {
        reject(error);
      } else {
        const sql = `DELETE FROM Usuario WHERE usuario_id = ?`;
        conexion.query(sql, [id], (error, resultado) => {
          if (error) {
            reject(error);
          } else {
            resolve({ mensaje: 'Usuario eliminado correctamente' });
          }
        });
      }
    });
  });
}