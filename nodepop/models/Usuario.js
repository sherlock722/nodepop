"use strict";

var mongoose = require('mongoose');

//Definir esquema del usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
    fecalta : Date
});

//metodo estatico
usuarioSchema.statics.lista = function(criterios, callback){

    var query = Usuarios.find(criterios);
    query.sort('name');
    query.exec(function(err,rows){
        if(err){
            return callback(err);
        }
        return callback(null, rows);
    });
};
//metodo de instancia
/*usuarioSchema.methods.get = function(idUsuarios, callback){
    console.log(this);
    return callback(null, this);
};*/

//Exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;





