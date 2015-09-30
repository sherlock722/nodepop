var express = require('express');
var router = express.Router();

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var jwt = require('jsonwebtoken');
var configJWT = require('../../local_config');

//Autenticacion (usuarios/authenticate)
router.post('/', function(req, res) {

    var email =req.body.email;
    var clave =req.body.clave;

    //console.log ('authenticate');

    //Buscar usuario en bbdd
    Usuario.findOne({email: req.body.email, clave: req.body.clave}, function(err, user) {

        //var user = { email:'abc@gmail.com',clave:'telefono'};

        if (err) {
            return res.status(500).json({ok: false, error: {code: 500, message: err.message}});
        }

        //Si no lo encontramos
        if (!user) {
            return res.json({ok: false, error: {code: 401, message: 'Authentication failed. User not found.'}});
        } else if (user) {

            // check if clave matches
            if (user.clave != req.body.clave) {
                res.json({ok: false, error: {code: 401, message: 'Authentication failed. Wrong password.'}});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, configJWT.jwt.secret, {
                    expiresInMinutes: configJWT.jwt.expiresInMinutes
                });

                // return the information including token as JSON
                res.json({
                    ok: true,
                    message: 'Enjoy your token!',
                    token: token
                });

            }

        }


        router.use(jwtAuth());
    });
});

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        ok: true,
        message: 'Zona de admin con usuario verificado.!'
    });
});

module.exports = router;
