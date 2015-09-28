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

    var query = Anuncio.find(criterios);
    //var query = Anuncio.find(criterios, $or([{tags:criterios.tags}]));

    //En caso de que no haya criterios se ordenan los anuncios por fecha descendente
    if (criterios={}) {
        query.sort({fecalta: -1}); //-1 ordena de manera descendente los anuncios, del mas nuevo al mas antiguo.
    }

    //ordenar por los campos que vengan en la query-string --???
    if (criterios.nombre !== null){
        query.sort ('nombre');
    }
    if (criterios.venta !== null){
        query.sort ('venta');
    }
    if (criterios.precio !== null){
        query.sort ('precio');
    }
    if (criterios.foto !== null){
        query.sort ('foto');
    }
    if (criterios.tags !== null){
        query.sort ('tags');
    }
    /*else {
        query.sort({nombre:-1,venta:-1,precio:-1,foto:-1});
    }*/

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
