const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.hbs'); // Carga el archivo home
});

router.get('/about', (req, res) => {
    res.render('about.hbs'); // Carga el archivo about
});

module.exports = router;