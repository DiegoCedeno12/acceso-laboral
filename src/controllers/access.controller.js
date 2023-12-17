import { agregarAcceso } from "../models/access.js";
import moment from 'moment';
import 'moment/locale/es'; // Import the locale if needed

import { agregarAcceso } from "../models/access.js";

export const addAccess = async (req, res, next) => {
  const empleadoId = req.params.id;

  try {
    const fechaAcceso = moment(); // Get the current date and time
    const resultado = await agregarAcceso(empleadoId, fechaAcceso);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ mensaje: 'Error al eliminar empleado' });
  }
}
