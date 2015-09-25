"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//var Anuncio = require('../models/Anuncio'); // alternativa
var Anuncio = mongoose.model('Anuncio'); //


// devuelve una lista de agentes en JSON
/*router.get('/', function(req, res) {

    //var criterios = {name:'Jones'};
    // sacar criterios de busqueda de query-string
    // ej. /apiv1/agentes/?name=Jones

    var criterios = {};
    if (req.query.name) {
        criterios.name = req.query.name;
    }

    Anuncio.lista(criterios, function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});*/

// crea un Anuncio
router.post('/', function(req, res, next) {

    var nuevo = req.body;

    // crear un registro de anuncio
    var Anuncio = new Anuncio(nuevo); // {name:'Nuevo', age: 18}

    Anuncio.save( function(err, creado) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        // devolver una confirmación
        res.json({ok:true, Anuncio: creado});

    });

});


module.exports = router;
