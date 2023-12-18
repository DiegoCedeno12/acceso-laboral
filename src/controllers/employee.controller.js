import { obtenerEmpleados, actualizarEmpleado, eliminarEmpleado, getById, crearEmpleadoYUsuario } from "../models/employee.js";

export const homehtml = async (req, res) => {
    const data = await obtenerEmpleados();
    const empleados = JSON.parse(data);
    res.render("home", { empleados });

}

// Controlador
export const addEmployee = async (req, res, next) => {
    try {
        console.log(req.body.email, req.body.nombre, req.body.apellido, req.body.cargo, req.body.telefono);
        await crearEmpleadoYUsuario(req.body.email, req.body.nombre, req.body.apellido, req.body.cargo, req.body.telefono);
        req.flash('success_msg', `Se registró el empleado con éxito`);
        return res.redirect('/');
    } catch (error) {
        console.error('Error al agregar empleado:', error);
        res.status(500).send('Error interno del servidor');
    }
};


export const updateEmployee = async (req, res, next) => {
    const empleadoId = req.params.id;
    const { nombre_u, apellido_u, telefono_u, cargo_u } = req.body;
    try {
        await actualizarEmpleado(empleadoId, nombre_u, apellido_u, telefono_u, cargo_u);
        req.flash('success_msg', `Se actualizó el empleado con éxito`);
        return res.redirect('/');

    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}

export const employee = async (req, res, next) => {
    const data = await getById(req.params.id);
    const empleado = JSON.parse(data);
    res.send({ empleado });
}

export const deleteEmployee = async (req, res, next) => {
    const empleadoId = req.params.id;
    try {
        await eliminarEmpleado(empleadoId);
        req.flash('success_msg', `Se eliminó el empleado con éxito`);
        return res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}