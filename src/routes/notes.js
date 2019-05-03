const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

// Muestra todas las notas en la base de datos
router.get("/notes", isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" }); // Obteniendo los datos de la DB segun el user
    res.render("notes/all-notes.hbs", { notes });
});

// Crea una nueva nota
router.get("/notes/add", isAuthenticated, (req, res) => {
    res.render("notes/new-note.hbs");
});

// Recibe los datos de la nota creada
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
    // Recibiendo los datos del formulario
    const { title, description } = req.body;
    const errors = [];

    // Validando errores
    if (!title) {
        errors.push({ text: "Por favor, ingresar un titulo" });
    }
    if (!description) {
        errors.push({ text: "Por favor, ingresar una descripcion" });
    }

    // No hay errores
    if (errors.length > 0) {
        res.render("notes/new-note", {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description }); // Creando una nueva tarea
        newNote.user = req.user.id;
        await newNote.save(); // Guardando los datos en la DB
        req.flash("success_msg", "Nota Creada con Exito");
        res.redirect("/notes");
    }
});

// Edita la nota seleccionada
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id); // Guardando la nota segun el id
    res.render("notes/edit-note.hbs", { note });
});

// Recibiendo los datos para editar la nota seleccionada
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
    const { title, description } = req.body;

    await Note.findByIdAndUpdate(req.params.id, { title, description }); // Actualizando la nota
    req.flash("success_msg", "Nota actualizada con exito");
    res.redirect("/notes");
});

// Elimina la nota seleccionada de la DB
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // Eliminando la nota
    req.flash("success_msg", "Nota eliminada con exito");
    res.redirect("/notes");
});

module.exports = router;
