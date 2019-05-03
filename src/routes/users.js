const express = require("express");
const router = express.Router();

const User = require("../models/User");
const passport = require("passport");

// Ventana de inicio de sesion
router.get("/users/signin", (req, res) => {
    res.render("users/signin.hbs");
});

// Recibe los datos para el inicio de sesion
router.post(
    "/users/signin",
    passport.authenticate("local", {
        successRedirect: "/notes",
        failureRedirect: "/users/signin",
        failureFlash: true
    })
);

// Ventana para registrarse
router.get("/users/signup", (req, res) => {
    res.render("users/signup.hbs");
});

// Recibiendo los datos del formulario para registrar
router.post("/users/signup", async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (!name || name.lenght <= 4) {
        errors.push({ text: "Debe escribir un nombre mayor de 4 caracteres" });
    }
    if (!email) {
        errors.push({ text: "Debe escribir un email" });
    }
    if (!password) {
        errors.push({ text: "Debe escribir una contraseña" });
    }
    if (!confirm_password) {
        errors.push({ text: "Debe confirmar las contraseñas" });
    }
    if (password != confirm_password) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (password.lenght < 4) {
        errors.push({ text: "La contraseña debe ser mayor de 4 caracteres" });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({ email: email });

        if (emailUser) {
            req.flash("error_message", "El email ya está en uso!");
            res.redirect("/users/signup");
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password); // Encriptando la contraseña
        await newUser.save(); // Guardar el usuario en la base de datos
        req.flash("success_msg", "Registrado correctamente!");
        res.redirect("/users/signin");
    }
});

// Recibe la ruta para cerrar sesion
router.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;
