const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Si el usuario esta logueado
        return next();
    }
    req.flash("error_msg", "No autorizado! Inicia Sesión");
    res.redirect("/users/signin");
};

module.exports = helpers;
