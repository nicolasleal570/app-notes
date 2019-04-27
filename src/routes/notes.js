const express = require('express');
const router = express.Router();

/**
 * Ruta de prueba
 */
router.get('/notes', (req, res) => {
    res.render('notes/notes.hbs');
});

router.get('/notes/add', (req, res) => {
    res.render('notes/add.hbs');
});


module.exports = router;