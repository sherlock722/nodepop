'use strict';
var express = require('express');
var router = express.Router();
var PushToken = require ('../../models/PushToken.js');
//Modulo de error
var errorHandler = require ('../../utils/Error.js').error;

//POST
router.post ('/', function (req,res){

    //Obtenemos los datos email y clave
    var plataforma = req.body.plataforma;
    var pushtoken = req.body.pushtoken;
    var usuario = req.body.usuario;

    //Es necesario instanciar el objeto anuncio en MongoDB
    //porque el método save es un método de instancia
    var pushToken = new PushToken (
        {plataforma:plataforma, token:pushtoken, usuario:usuario});

    //Crear un registro de Anuncio
    pushToken.save(function (err, result){
        if (err) {

            //Uso del Modulo de Error
            return errorHandler(err,res);
        }

        res.json({ok:true, data: result});
    });
});

module.exports = router;

