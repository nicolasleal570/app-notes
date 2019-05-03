/**
 * Se encarga de configurar la sesión
 */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// Crea una autenticacion con el nombre 'local'
passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: "No existe el usuario" }); // No encontramos un usuario
            } else {
                const match = await user.matchPassword(password);

                if (match) {
                    return done(null, user); // Nul = no hay errores. user = devuelve un usuario
                } else {
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    });
                }
            }
        }
    )
);

// Crea una sesion y le aplica al usuario un id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Busca al usuario segun su id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
