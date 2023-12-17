import { Router } from "express";
import {signup, signin, renderSigninForm, logout} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = Router();


// Routes
router.post("/auth/sign-up", signup);

router.get("/auth/sign-in", renderSigninForm);

router.post("/auth/sign-in", signin);

router.get("/auth/logout", isAuthenticated, logout);

export default router;