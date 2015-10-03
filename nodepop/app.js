'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Conexion a bbdd
require ('./connection/dbmongo.js');

//Modelos
require ('./models/Anuncio.js');
require ('./models/Usuario.js');
require ('./models/PushToken.js');

//utils
//require ('./utils/Error.js');

var routes = require('./routes/index');
var users = require('./routes/users');

//Ruta del controlador de anuncios
var anuncios = require ('./routes/anuncios');

//Ruta del controlador de anuncios
var anunciosv1 = require ('./routes/apiv1/anuncios');

//Ruta para Autenticacion
var auth=require('./routes/apiv1/admin');


//Ruta para registro de Usuarios
var altaUsuario = require ('./routes/apiv1/usuarios');

//Ruta consulta Usuarios
//var consu = require ('./routes/apiv1/usuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Se añade el router (controlador) de anuncios
app.use('/anuncios', anuncios);

//Se añade el router (controlador) de anuncios en la versio 1
//version v.1
app.use('/apiv1/anuncios', anunciosv1);

//Autenticacion
app.use('/usuario/authenticate', auth);
//app.use('/apiv1/admin', )
//app.use('/apiv1', require('./routes/apiv1/authenticate'));

//Registro de Usuarios
app.use('/altaUsuarios', altaUsuario);
app.use('/consultaUsuarios',altaUsuario);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
