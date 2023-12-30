import { obtenerEmpleados, actualizarEmpleado, eliminarEmpleado, getById, crearEmpleadoYUsuario, obtenerAccesosEmpleados, obtenerAccesosTotales, obtenerAccesosCargos, obtenerAccesosCargosEmpleados } from "../models/employee.js";

export const homehtml = async (req, res) => {
    const data = await obtenerEmpleados();
    const empleados = JSON.parse(data);
    res.render("home", { empleados });

}

export const obtenerAccesosEmpleadosjson = async (req, res) => {
    try {
        const data = await obtenerAccesosEmpleados();
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }

}

export const obtenerAccesostotalesjson = async (req, res) => {
    try {
        const data = await obtenerAccesosTotales();
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }

}

export const obtenerAccesosCargosjson = async (req, res) => {
    try {
        const data = await obtenerAccesosCargos();
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }

}

export const renderdashboard = async (req, res) => {
    const data = await obtenerAccesosCargosEmpleados();
    const empleados = JSON.parse(data);
    res.render("dashboard",  {empleados});
};

// Controlador
export const addEmployee = async (req, res, next) => {
    try {
        let errorMessage;
        await crearEmpleadoYUsuario(req.body.email, req.body.nombre, req.body.apellido, req.body.cargo, req.body.telefono)
            .catch(error => {
                errorMessage = error.mensaje;
            });

        if (errorMessage) {
            console.error('Error al agregar empleado:', errorMessage);
            req.flash('error_msg', errorMessage);
        } else {
            req.flash('success_msg', `Se registró el empleado con éxito`);
        }
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
        let errorMessage;
        await actualizarEmpleado(empleadoId, nombre_u, apellido_u, telefono_u, cargo_u)
            .catch(error => {
                errorMessage = error.mensaje;
            });
        if (errorMessage) {
            req.flash('error_msg', errorMessage);
        } else {
            req.flash('success_msg', `Se actualizó el empleado con éxito`);
        }
        return res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}

export const employee = async (req, res, next) => {
    try {
        const data = await getById(req.params.id);
        if (data) {
            const empleado = JSON.parse(data);
            res.status(200).json({ data: empleado })
        } else {
            res.status(500).json({ mensaje: 'Error al obtener informacion del empleado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener informacion del empleado' });
    }
}

export const deleteEmployee = async (req, res, next) => {
    const empleadoId = req.params.id;
    try {
        let errorMessage;
        await eliminarEmpleado(empleadoId)
            .catch(error => {
                errorMessage = error.mensaje;
            });
        if (errorMessage) {
            req.flash('error_msg', errorMessage);
        } else {
            req.flash('success_msg', `Se eliminó el empleado con éxito`);
        }
        return res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar empleado:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar empleado' });
    }
}