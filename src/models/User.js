import { conexion } from '../database/database-conector.js';
import { generateId } from "../utils/utils.js";
import bcrypt from 'bcrypt';

// Crea un nuevo empleado con información mínima
export async function crearEmpleadoYUsuario(email, password, role) {
  return new Promise(async (resolve, reject) => {
    let nuevoId;

    const intentarAgregarUsuarioYEmpleado = async () => {
      nuevoId = generateId();

      const usuarioExistente = await getById(nuevoId);

      if (!usuarioExistente) {
        const haspassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const sqlUsuario = `INSERT INTO Usuario (usuario_id, email, password, role) VALUES (?, ?, ?, ?)`;
        const sqlEmpleado = `INSERT INTO Empleado (empleado_id, usuario_id) VALUES (?, ?)`;
        conexion.query(sqlUsuario, [nuevoId, email, haspassword, role], (errorUsuario, resultadoUsuario) => {
          if (errorUsuario) {
            reject({ mensaje: 'No se pudo registrar el usuario' });
          } else {
            conexion.query(sqlEmpleado, [nuevoId, nuevoId], (errorEmpleado, resultadoEmpleado) => {
              if (errorEmpleado) {
                reject({ mensaje: 'No se pudo registrar el empleado' });
              } else {
                resolve({
                  usuario_id: nuevoId,
                  email: email,
                  role: role
                });
              }
            });
          }
        });
      } else {
        intentarAgregarUsuarioYEmpleado();
      }
    };
    intentarAgregarUsuarioYEmpleado();
  });
}

// Consulta usuario por Id
export async function getById(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM empleado WHERE usuario_id = ?`;
    conexion.query(sql, [id], (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(resultados[0]);
      }
    });
  });
}

// Consulta usuario por email
export async function getByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Usuario WHERE email = ?`;
    conexion.query(sql, [email], (error, resultado) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        resolve(resultado[0]);
      }
    });
  });
}
