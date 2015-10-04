'use strict';

var configJWTes = require('../local_config').esJsones;
var configJWTen = require('../local_config').esJsonen;

exports.error = function (err, res, idioma){

        //console.log (err);

        if (err) {

                //Ejemplo cuando el token no es correcto. Al consultar Anuncios
                //Se puede hacer mejor pero es una manera de poder probarlo :)

                if (idioma === 'en') {

                        //Aqui se tratan cada uno de los errores que existan en la app.
                        if (err === "Error_token") {
                                console.log ('3');
                                res.json({ok: false, error: configJWTen.Error_token});

                        }
                } else
                        if (err === "Error_token") {
                                res.json({ok: false, error: configJWTes.Error_token});

                        }
        }

};