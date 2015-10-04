'use strict';

var express = require('express');
var router = express.Router();
var Anuncio = require ('../../models/Anuncio.js');

//Recuperar solo los tags
router.get('/', function(req, res, next) {

    var criterios = {};

    Anuncio.listaTags( function(err, lista) {

        if (err) {

            return errorHandler(err,res);
        }

        res.json({ok:true, data: lista});

    });

});
module.exports = router;