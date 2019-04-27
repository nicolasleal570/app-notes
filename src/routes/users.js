const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('SIGN IN');
});

router.get('/users/signup', (req, res) => {
    res.send('SIGN UP');
});



module.exports = router;