"use strict";

var mongoose = require('mongoose');

//Definir esquema del anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
    fecalta : Date
});

//Metodo estático
anuncioSchema.statics.lista = function(cb) {

    // uso .find
    var query = Anuncio.find({});
    query.sort('nombre'); //Ordenado por nombre

    query.exec( function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);

    });
};

anuncioSchema.statics.listaconcriterios = function( criterios, callback) {

    //Falta añadir los filtros
    var query = Anuncio.find (criterios);

    // var query = Anuncio.find({nombre:criterios.nombre});
    //var query = Anuncio.find(criterios, $or:[{tags:criterios.tags(0)}]);

    //En caso de que no haya criterios se ordenan los anuncios por fecha descendente
    if (criterios={}) {
        query.sort({fecalta: -1}); //-1 ordena de manera descendente los anuncios, del mas nuevo al mas antiguo.
    }

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);
    });
};

//Exportar
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;
