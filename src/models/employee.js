import { conexion } from '../database/database-conector.js';
import { generateId } from '../utils/utils.js';
import { getByEmail } from './User.js';

// crear un empleado
export async function crearEmpleadoYUsuario(email, nombre, apellido, cargo, telefono) {
  return new Promise(async (resolve, reject) => {
    let nuevoId;
    const role = 'EMPLEADO';

    const intentarAgregarUsuarioYEmpleado = async () => {
      nuevoId = generateId();

      const usuarioExistente = await getById(nuevoId);

      if (!usuarioExistente) {
        const userEmail = await getByEmail(email);
        if (!userEmail) {
          const sqlUsuario = `INSERT INTO Usuario (usuario_id, email, role) VALUES (?, ?, ?)`;
        const sqlEmpleado = `INSERT INTO Empleado (empleado_id, usuario_id, nombre, apellido, cargo, telefono) VALUES (?, ?, ?, ?, ?, ?)`;
        conexion.query(sqlUsuario, [nuevoId, email, role], (errorUsuario, resultadoUsuario) => {
          if (errorUsuario) {
            req.flash('error_msg', `No se pudo registrar el empleado`);
            reject(errorUsuario);
          } else {
            conexion.query(sqlEmpleado, [nuevoId, nuevoId, nombre, apellido, cargo, telefono], (errorEmpleado, resultadoEmpleado) => {
              if (errorEmpleado) {
                req.flash('error_msg', `No se pudo registrar el empleado`);
                reject(errorEmpleado);
              } else {
                resolve({ mensaje: 'Empleado registrado correctamente' });
              }
            });
          }
        });
        } else {
          req.flash('error_msg', `Ya existe un empleado con ese correo`);
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
        req.flash('error_msg', `No se pudo obtener los empleados`);
        reject(error);
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
        req.flash('error_msg', `No se pudo actualizar el empleado`);
        reject(error);
      } else {
        console.log("Se ha podido dar una solucion");
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
        req.flash('error_msg', `No se pudo obtener el empleado`);
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
        req.flash('error_msg', `No se pudo eliminar el empleado`);
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