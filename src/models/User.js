import { conexion } from '../database/database-conector.js';
import { generateId } from "../utils/utils.js";
import bcrypt from 'bcrypt';


// Crea un nuevo usuario
export async function agregarUsuario(email, password, role) {
  return new Promise((resolve, reject) => {
    function intentarAgregarUsuario() {
      let nuevoId = generateId();
      getById(nuevoId)
        .then(usuario => {
          if (!usuario) {
            const haspassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const sql = `INSERT INTO Usuario (usuario_id, email, password, role) VALUES (?, ?, ?, ?)`;
            conexion.query(sql, [nuevoId, email, haspassword, role], (error, resultado) => {
              if (error) {
                reject(error);
              } else {
                // Aquí resolvemos la Promesa con el usuario recién creado
                resolve({ id: nuevoId, email, role });
              }
            });
          } else {
            intentarAgregarUsuario();
          }
        })
        .catch(error => reject(error));
    }
    intentarAgregarUsuario();
  });
}


export async function getById(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Usuario WHERE usuario_id = ?`;
    conexion.query(sql, [id], (error, resultados) => {
      if (error) {
        reject(error);
      } else {
        resolve(resultados[0]);
      }
    });
  });
}


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
