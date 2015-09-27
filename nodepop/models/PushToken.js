"use strict";

var mongoose = require('mongoose');

//Definir esquema del pushToken
var pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    usuario: String
});

//Exportar
var PushToken = mongoose.model('PushToken', pushTokenSchema);
module.exports = PushToken;
