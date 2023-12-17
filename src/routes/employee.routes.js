import { Router } from "express";
import { isAuthenticated } from "../utils/utils.js";
import { employee, deleteEmployee, homehtml, updateEmployee } from "../controllers/employee.controller.js";

const router = Router();

router.get('/', homehtml);

router.get('/employee/:id', employee);

router.put('/employee/updated/:id', updateEmployee);

router.delete('/employee/delete/:id', deleteEmployee);

export default router;