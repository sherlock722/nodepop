"use strict";

var mongoose = require('mongoose');
var db = mongoose.connection;

//Handler de error de conexion
db.on('error',console.error.bind(console, 'connection error:'));


//Handler de conexion
db.once('open', function() {
    console.log('conectado a mongodb');
});

//Conectar
mongoose.connect('mongodb://localhost/nodepop');
