import { obtenerEmpleados, actualizarEmpleado, eliminarEmpleado, getById } from "../models/employee.js";

export const homehtml = async (req, res) => {
    const empleados = await obtenerEmpleados();
    res.send({ empleados: empleados });
    //res.render("index", {families, PageTitle: 'Inicio'});

}

export const updateEmployee = async (req, res, next) => {
    const empleadoId = req.params.id;
    const { nombre, apellido, telefono, cargo } = req.body;

    try {
        const resultado = await actualizarEmpleado(empleadoId, nombre, apellido, telefono);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}

export const employee = async (req, res, next) => {

    const empleado = await getById(req.params.id);
    res.send({ empleado: empleado });
    //res.render("index", {families, PageTitle: 'Inicio'});
}

export const deleteEmployee = async (req, res, next) => {
    const empleadoId = req.params.id;
    try {
        const resultado = await eliminarEmpleado(empleadoId);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}