import mysql from 'mysql';

const conexion = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'acceso_local'
});

const conectar = () => {
  conexion.connect(err => {
    if (err) throw err;
    console.log("Se conectó a la base de datos")
  });
};

export {conectar, conexion };