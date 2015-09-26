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
/*anuncioSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);
    query.sort('nombre');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};*/

//Exportar
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;
