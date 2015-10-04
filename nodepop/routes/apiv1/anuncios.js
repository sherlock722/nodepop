'use strict';
var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
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

//Lista a partir de criterios de busqueda
router.get('/', function(req, res) {

    // Criterios (filtros) de busqueda de query-string
    var criterios = {};
    var inicio;
    var limite;

    var tokenHead=req.headers['x-access-token']||0;//Valor por defecto en caso de no venir en la cabecera

    if (typeof req.query.nombre !=='undefined') {
        criterios.nombre = req.query.nombre;
    }

    if (typeof req.query.venta!=='undefined') {
        criterios.venta = req.query.venta;
    }

    if (typeof req.query.precio!=='undefined') {
        criterios.precio = req.query.precio;

    }

    if (typeof req.query.foto !== 'undefined') {
        criterios.foto = req.query.foto;
    }

    if (typeof req.query.tags!== 'undefined') {

        criterios.tags = req.query.tags;
    }
    if (typeof req.query.token !=='undefined'){
        criterios.token = req.query.token;
    }

    //Limite e inicio
    if (typeof req.query.limit !== 'undefined') {
        limite = parseInt(req.query.limit) || 10;
    }

    if (typeof req.query.start !== 'undefined') {
        inicio = parseInt (req.query.start) || 0;
    }

    //Se llama al metodo listaconcriterios del modelo
    Anuncio.listaconcriterios(criterios, inicio, limite, tokenHead, function(err, lista) {

        if (err) {

            return errorHandler(err,res);
        }

        res.json({ok:true, data: lista});

    });

});

//Recuperar solo los tags
/*router.get('/tags', function(req, res, next) {
    ads.listTags(function(err,rows){
        if (err) {
            return next(err)
        }
        res.json(rows);
    });
});*/
module.exports = router;

