'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var configJWT = require('../local_config').jwt;
var configTags = require('../local_config').tags;


//Definir esquema del anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
    fecalta : Date
});

//Metodo estático lista de anuncios ordenados por nombre
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

//Metodo estatico para consultar anuncios
anuncioSchema.statics.listaconcriterios = function( criterios, inicio, limite, callback) {

    //Comprobacion del token
    jwt.verify(criterios.token, configJWT.secret, function(err) {

        if (!err){

            var query = Anuncio.find();

            //En caso de que no haya criterios se ordenan los anuncios por fecha descendente
            if (criterios === null) {

                query.sort({fecalta: -1}); //-1 ordena de manera descendente los anuncios, del mas nuevo al mas antiguo.

            } else { //Existen criterios en query-string

                //Filtro x tags
                if (criterios.tags && criterios.tags.length > 0) {
                    query.where('tags').in(new Array(criterios.tags));//.in pide que sea un array lo que le pase.
                }
                //Filtro por ventas
                if (criterios.venta) {
                    query.where({'venta': criterios.venta});
                }
                //Filtro x precio
                if (criterios.precio) {
                    var guion = '-';
                    var cad = criterios.precio.split(guion, 2);

                    if (cad.length > 1) {

                        if (cad[0] !== '' && cad[1] !== '') {

                            query.where({precio: {'$gte': cad[0], '$lte': cad[1]}});

                        } else if (cad[0] !== '' && cad[1] === '') {

                            query.where({precio: {'$gte': cad[0]}});

                        } else if (cad[0] === '' && cad[1] !== '') {

                            query.where({precio: {'$lte': cad[1]}});

                        }
                    } else {

                        query.where({'precio': criterios.precio});
                    }

                }
                //Filtro por nombre (expresion regular)
                if (criterios.nombre) {
                    query.where({'nombre': criterios.nombre = new RegExp('^' + criterios.nombre, 'i')});
                }

            }
            //Inicio y limites
            query.skip(inicio);
            query.limit(limite);

            query.exec(function (err, rows) {
                if (err) {
                    return callback(err);
                }

                return callback(null, rows);
            });

        } else { //token no valido

            return callback('Failed to authenticate token.');
        }
    });
}

anuncioSchema.statics.listaTags = function(cb) {

        //var tags = ['mobile', 'motor', 'lifestyle'];//Lista de tags existentes

        var tags=configTags.tags;

        for (var x=0; x<tags.length;x++) {
            return cb(null, tags);
         }

}


//Exportar
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;
