const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// INITS
const app = express();
require('./database'); // Ejecutando el; archivo que inicia la conexion a la base de datos (MongoDB)

/**
 * SETTINGS
*/
app.set('port', process.env.PORT || 3000); // Establece el puerto del servidor
app.set('views', path.join(__dirname, 'views')); // Ubica la carpeta views (Ubic archivos de HTML)
app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs', // Plantilla principal de toda la aplicacion
    layoutsDir: path.join(app.get('views'), 'layout'), // Ubicacion del archivo principal html
    partialsDir: path.join(app.get('views'), 'partials'), // Archivos html globales 
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // Utilizando el motor de vistas

/**
 * MIDDLEWARES 
*/
app.use(express.urlencoded({extended: false})); // Entiende y recibe los datos enviados por los formularios
app.use(methodOverride('_method'));
app.use(session({
    secret: 'badan21', // Palabra clave secreta
    resave: true,
    saveUninitialized: true
}));

/**
 * GLOBAL VARIABLES 
*/

/**
 * ROUTES
*/
app.use(require('./routes/home')); // Importando las rutas de la carpeta routes
app.use(require('./routes/users'));
app.use(require('./routes/notes')); // Ruta de prueba


/**
 * STATIC FILES 
*/
app.use(express.static(path.join(__dirname, 'public')));

/**
 * SERVER START 
*/
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});