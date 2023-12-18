import { Router } from "express";
import { isAuthenticated } from "../utils/utils.js";
import { employee, deleteEmployee, homehtml, updateEmployee, addEmployee } from "../controllers/employee.controller.js";

const router = Router();

router.get('/',isAuthenticated,  homehtml);

router.post('/employee/add', addEmployee);

router.get('/employee/:id', employee);

router.put('/employee/updated/:id', updateEmployee);

router.get('/employee/delete/:id', deleteEmployee);

export default router;