"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Modelo
var Anuncio = require ('../../models/Anuncio.js');
//var Anuncio = mongoose.model('Anuncio'); //

//GET
//Devuelve una lista de anuncios en JSON
router.get('/', function(req, res) {

    Anuncio.lista(function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});


module.exports = router;

