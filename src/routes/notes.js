const express = require('express');
const router = express.Router();

/**
 * Ruta de prueba
 */
router.get('/notes', (req, res) => {
    res.send('NOTES FROM DATABASE');
});


module.exports = router;