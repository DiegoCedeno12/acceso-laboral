import passport from "passport";
import LocalStrategy from 'passport-local';
import { getByEmail, crearEmpleadoYUsuario, getById } from "../models/User.js";
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
    done(null, user['usuario_id']);
});

passport.deserializeUser(async (id, done) => {
    const user = await getById(id);
    let data = {
        usuario_id: user['usuario_id'],
        email: user['email'],
        role: user['role']
    };
    done(null, data);
});

passport.use('local-sing-up', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    await getByEmail(email)
        .then(existeemail => {
            if (existeemail) {
                //return done(null, false, req.flash('signupMessage', 'El Correo Electrónico ya está en uso'));
                console.log("El Correo Electrónico ya está en uso");
                return done(null, false, { message: 'El Correo Electrónico ya está en uso' });
            } else {
                const users = crearEmpleadoYUsuario(email, password, req.body.role);
                return users;
            }
        })
        .then(user => {
            // Asegúrate de que user sea el resultado deseado de agregarUsuario
            done(null, user);
        })
        .catch(error => {
            console.error('Error al obtener usuario por email:', error.message);
            done(error);
        });
}));


passport.use('local-sing-in', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const existeemail = await getByEmail(email);

        if (!existeemail) {
            console.log("El usuario no existe");
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        if (!bcrypt.compareSync(password, existeemail['password'])) {
            console.log("Contraseña incorrecta");
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        let data = {
            usuario_id: existeemail['usuario_id'],
            email: existeemail['email'],
            role: existeemail['role']
        };
        console.log("Contraseña correcta");
        return done(null, data);
    } catch (error) {
        console.error('Error al obtener usuario');
        return done(error);
    }
}));

