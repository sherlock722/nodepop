'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var sha = require ('sha256');

//Modulo de error
var errorHandler = require ('../../utils/Error.js').error;

//POST Registro de usuarios
router.post ('/', function (req, res){

    //Obtenemos los datos email y clave
    var nombre = req.body.nombre;
    var email = req.body.email;
    var clave = req.body.clave;

    //Se encripta por medio del modulo "sha" la contraseña (deprecated)
    //var clave = sha(clave);

    // crear un registro de Usuario
    var usuario = new Usuario({nombre:nombre,email:email,clave:sha(clave)});

    usuario.save ( function(err, creado) {
        if (err) {

            //console.log(err);
            //return res.json({ok:false, error: err});

            //Uso del Modulo de Error
            return errorHandler(err,res);
        }
        // devolver una confirmación
        req.usuario=usuario.nombre;//Guardamos el nombre del usuario
        res.json({ok:true, usuario: creado});

    });

});

//GET Lista de Usuarios
router.get ('/', function (req,res,next){

    Usuario.lista(function(err, usuarios) {

        if (err) {
            /*console.log(err);
             return res.json({ok:false, error: err});*/
            return errorHandler(err,res);
        }

        res.json({ok:true, data: usuarios});

    });


});

module.exports = router;

