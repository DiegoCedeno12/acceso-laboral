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

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

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

// static/files
app.use( '/public' ,express.static(path.join(__dirname, 'public')));

export default app;