'use strict';

var express = require('express');
var router = express.Router();
var Anuncio = require ('../../models/Anuncio.js');
//Modulo de error
var errorHandler = require ('../utils/Error.js').error;

//Recuperar solo los tags
router.get('/', function(req, res) {

    Anuncio.listaTags( function(err, lista) {

        if (err) {

            return errorHandler(err,res);
        }

        res.json({ok:true, data: lista});

    });

});
module.exports = router;