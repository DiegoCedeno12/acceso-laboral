
import { agregarAcceso, getByEmployeeAcceso, obtenerAccesos } from "../models/access.js";
import moment from 'moment';
import 'moment/locale/es.js'; // Import the locale if needed

export const getAccess = async (req, res, next) => {
  try {
    const resultado = await obtenerAccesos();
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ mensaje: 'Error al eliminar empleado' });
  }
};

export const addAccess = async (req, res, next) => {
  const empleadoId = req.params.id;
  try {
    const fechaAcceso = moment().format('YYYY-MM-DD HH:mm:ss'); // Get the current date and time
    const resultado = await agregarAcceso(empleadoId, fechaAcceso);
    if (resultado) {
      res.status(200).json(resultado);

    } else {
      res.status(500).json({ mensaje: 'Error al registrarse' });
    }
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ mensaje: 'Error al registrarse' });
  }
}

export const getAccessEmployee = async (req, res, next) => {
  const empleadoId = req.params.id;

  try {
    const resultado = await getByEmployeeAcceso(empleadoId);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ mensaje: 'Error al eliminar empleado' });
  }
};