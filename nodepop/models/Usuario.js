'use strict';

var mongoose = require('mongoose');

//Definir esquema del usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
    fecalta : Date
});

//metodo estatico para consultar usuarios
usuarioSchema.statics.lista = function(callback){

    var query = Usuario.find();
    query.sort('fecalta');
    query.exec(function(err,rows){
        if(err){
            return callback(err);
        }
        return callback(null, rows);
    });
};

//Crear Index por email
usuarioSchema.index({'email':1},{ unique: true });

//Exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;





