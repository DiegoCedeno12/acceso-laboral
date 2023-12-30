import { conexion } from '../database/database-conector.js';
import { generateId } from '../utils/utils.js';
import { getByEmail } from './User.js';

// crear un empleado
export async function crearEmpleadoYUsuario(email, nombre, apellido, cargo, telefono) {
  return new Promise(async (resolve, reject) => {
    let nuevoId;
    const role = 'EMPLEADO';
    const contras = 'EMPLEADO';

    const intentarAgregarUsuarioYEmpleado = async () => {
      nuevoId = generateId();

      const usuarioExistente = await getById(nuevoId);

      if (!usuarioExistente) {
        const userEmail = await getByEmail(email);
        if (!userEmail) {
          const sqlUsuario = `INSERT INTO Usuario (usuario_id, email, password, role) VALUES (?, ?, ?, ?)`;
          const sqlEmpleado = `INSERT INTO Empleado (empleado_id, usuario_id, nombre, apellido, cargo, telefono) VALUES (?, ?, ?, ?, ?, ?)`;
          conexion.query(sqlUsuario, [nuevoId, email, contras, role], (errorUsuario, resultadoUsuario) => {
            if (errorUsuario) {
              reject({ mensaje: 'No se pudo registrar el usuario' });
              console.log(errorUsuario);
            } else {
              conexion.query(sqlEmpleado, [nuevoId, nuevoId, nombre, apellido, cargo, telefono], (errorEmpleado, resultadoEmpleado) => {
                if (errorEmpleado) {
                  reject({ mensaje: 'No se pudo registrar el empleado' });
                } else {
                  resolve({ mensaje: 'Empleado registrado correctamente' });
                }
              });
            }
          });
        } else {
          reject({ mensaje: 'Ya existe un empleado con ese correo' });
        }
      } else {
        intentarAgregarUsuarioYEmpleado();
      }
    };
    intentarAgregarUsuarioYEmpleado();
  });
}

// obtiene empleados
export async function obtenerEmpleados() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT e.empleado_id, e.nombre, e.apellido, e.telefono, e.cargo
      FROM empleado e
      JOIN usuario u ON e.usuario_id = u.usuario_id
      WHERE u.role = 'EMPLEADO';
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject({ mensaje: 'No se pueden obtener los empleados' });
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}

// Actualiza la informacion del usuario
export async function actualizarEmpleado(id, nombre, apellido, telf, cargo) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE empleado SET nombre = ?, apellido = ?, telefono = ?, cargo = ? WHERE usuario_id = ?`;
    conexion.query(sql, [nombre, apellido, telf, cargo, id], (error, resultado) => {
      if (error) {
        reject({ mensaje: 'No se puede actualizar el empleado' });
      } else {
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
        reject({ mensaje: 'No se puede obtener el empleado' });
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
        reject({ mensaje: 'No se puede eliminar el empleado' });
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

export async function obtenerAccesosEmpleados() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
    CONCAT(u.nombre, ' ', u.apellido) AS "Nombre",
    CAST(a.fecha_hora AS DATETIME) AS "Fecha",
    COUNT(*) AS "Cantidad por dia"
    FROM
        empleado u
    INNER JOIN
        acceso a ON u.empleado_id = a.empleado_id
    GROUP BY
        u.empleado_id, DATE(a.fecha_hora)
    ORDER BY
        u.empleado_id, DATE(a.fecha_hora);
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject({ mensaje: 'No se pueden obtener los empleados' });
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}

export async function obtenerAccesosTotales() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
    CAST(fecha_hora AS DATETIME) AS "Fecha",
    COUNT(*) AS "Cantidad por dia"
    FROM
        acceso
    GROUP BY
        DATE(fecha_hora)
    ORDER BY
        DATE(fecha_hora);
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject({ mensaje: 'No se pueden obtener los empleados' });
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}

export async function obtenerAccesosCargos() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
    u.cargo,
    COUNT(*) AS "Cantidad por dia"
    FROM
        empleado u
    INNER JOIN
        acceso a ON u.empleado_id = a.empleado_id
    GROUP BY
        u.cargo
    ORDER BY
        u.cargo;
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject({ mensaje: 'No se pueden obtener los empleados' });
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}

export async function obtenerAccesosCargosEmpleados() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
    u.empleado_id,
    u.nombre,
    u.apellido,
    u.cargo,
    COUNT(*) AS "acceso"
    FROM
        empleado u
    INNER JOIN
        acceso a ON u.empleado_id = a.empleado_id
    GROUP BY
        u.empleado_id
    ORDER BY
        u.empleado_id;
    `;
    conexion.query(sql, (error, resultados) => {
      if (error) {
        reject({ mensaje: 'No se pueden obtener los empleados' });
      } else {
        resolve(JSON.stringify(resultados));
      }
    });
  });
}