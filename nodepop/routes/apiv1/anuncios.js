"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Modelo
var Anuncio = require ('../../models/Anuncio.js');

//Modulo de error
var errorHandler = require ('../../utils/Error.js').error;


//GET
//Devuelve una lista de anuncios en JSON (sin criterios)
/*router.get('/', function(req, res) {

    Anuncio.lista(function(err, lista) {
        if (err) {

            //Uso del Modulo de Error
            return errorHandler(err,res);

            //return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});*/

//Lista a partir de datos de busqueda
router.get('/', function(req, res) {

    // sacar criterios de busqueda de query-string
    var criterios = {};

    if (req.query.nombre) {
        criterios.nombre = req.query.nombre;
    }

    if (req.query.venta) {
        criterios.venta = req.query.venta;
    }

    if (req.query.precio) {
        criterios.precio = req.query.precio;
    }

    if (req.query.foto) {
        criterios.foto = req.query.foto;
    }

    if (req.query.tags) {
        criterios.tags = req.query.tags;
    }

    Anuncio.listaconcriterios(criterios, function(err, lista) {
        if (err) {
            /*console.log(err);
            return res.json({ok:false, error: err});*/
            return errorHandler(err,res);
        }

        res.json({ok:true, data: lista});

    });

});

module.exports = router;

