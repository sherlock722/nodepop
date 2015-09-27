"use strict";

var mongoose = require('mongoose');

//Definir esquema del usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

//Exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;





