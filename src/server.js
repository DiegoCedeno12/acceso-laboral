import "dotenv/config";
import path from "path";
import express from "express";
import engine from 'ejs-mate';
import flash from 'connect-flash';
import morgan from 'morgan'; // Añadir morgan
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';

import './passport/auth.js';
import userRouts from "./routes/User.routes.js";
import employeeRouts from "./routes/employee.routes.js";
import accessRouts from "./routes/access.routes.js";import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Settings
app.set('port', process.env.PORT || 4000)
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'mysecretsession',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Routs
app.use(userRouts);
app.use(employeeRouts);
app.use(accessRouts);

// static/files
app.use( '/public' ,express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname,'..', 'node_modules')));

export default app;