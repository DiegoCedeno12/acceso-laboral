import { Router } from "express";

import { getAccess, addAccess, getAccessEmployee } from "../controllers/access.controller.js";

const router = Router();

router.get('/access/add/:id', addAccess);

router.get('/access/:id', getAccess);

router.get('/access/employee/:id', getAccessEmployee);

export default router;