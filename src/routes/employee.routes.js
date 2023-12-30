import { Router } from "express";
import { isAuthenticated } from "../utils/utils.js";
import { employee, deleteEmployee, homehtml, updateEmployee, addEmployee, renderdashboard, obtenerAccesosEmpleadosjson, obtenerAccesostotalesjson, obtenerAccesosCargosjson } from "../controllers/employee.controller.js";

const router = Router();

router.get('/',isAuthenticated,  homehtml);

router.post('/employee/add', addEmployee);

router.get('/employee/:id', employee);

router.put('/employee/updated/:id', updateEmployee);

router.get('/employee/delete/:id', deleteEmployee);

router.get('/dashboard', renderdashboard);

router.get('/access/employee', obtenerAccesosEmpleadosjson);

router.get('/access/json', obtenerAccesostotalesjson);

router.get('/access/position', obtenerAccesosCargosjson);

export default router;