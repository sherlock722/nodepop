'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio'); //

//Modulo de error
var errorHandler = require ('../utils/Error.js').error;

//GET
router.get ('/', function (req,res){

    //Es necesario instanciar el objeto anuncio en MongoDB
    //porque el método save es un método de instancia
    var anuncio = new Anuncio ({nombre: 'Bicicleta',
        venta: true,
        precio: 230.15,
        foto: 'bici.jpg',
        tags: [ 'lifestyle', 'motor'],
        fecalta: new Date()});

    //Crear un registro de Anuncio
    anuncio.save(function (err, result){
                    if (err) {
                        /*console.log(err);
                        return res.json({ok:false, error: err});*/
                        //Uso del Modulo de Error
                        return errorHandler(err,res);
                    }

                    res.json({ok:true, data: result});
    });
});

module.exports = router;


