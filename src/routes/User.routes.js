import { Router } from "express";
import {signup, signin, renderSigninForm, logout} from "../controllers/user.controller.js";

const router = Router();


// Routes
router.post("/auth/sign-up", signup);

router.get("/auth/sign-in", renderSigninForm);

router.post("/auth/sign-in", signin);

router.get("/auth/logout", isAuthenticated, logout);

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/auth/sign-in');
}

export default router;