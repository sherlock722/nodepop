"use strict";

var mongoose = require('mongoose');

//Definir esquema del anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

//Metodo estático
anuncioSchema.statics.lista = function(cb) {

    // uso .find
    var query = Anuncio.find({});
    query.sort('nombre');

    query.exec( function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);

    });
};

//Exportar
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;
