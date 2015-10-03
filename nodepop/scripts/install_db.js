'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;
var readLine = require('readline');
var async = require('async');
var sha = require ('sha256');
var passUser = require('../local_config').passUser;
//Modelos
var Anuncio = require ('../models/Anuncio.js');
var Usuario = require ('../models/Usuario.js');


//Handler de conexion
db.once('open', function() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

});

//Conectar a al bbdd
mongoose.connect('mongodb://localhost/nodepop');

//Script de llamada a la carga de Anuncios y Usuarios
function runInstallScript() {

    async.series([
        initAnuncios,
        initUsuarios
        ], function(err, results) {
            if (err) {
                console.error('Hubo un error: ', err);
                return process.exit(1);
            }
            return process.exit(0);
        }
    );

}
//Carga de Anuncios
function initAnuncios(done) { //done=cb

    var Anuncio = mongoose.model('Anuncio');

    // Se eliminan todos los registros. El callback crea los nuevos anuncios
    Anuncio.remove({}, function() {

        // aqui cargaríamos el json de anuncios (readFile, JSON.parse, iterar con Anuncio.save...)

        //En este caso al ser sólo dos Anuncios se hacen uno a uno con Anuncio.save

        //Cargar el primer anuncio
        var anuncio_1 = new Anuncio ({nombre: 'Bicicleta',
            venta: true,
            precio: 230.15,
            foto: 'bici.jpg',
            tags: [ 'lifestyle', 'motor'],
            fecalta: new Date()});

        //Crear un registro de Anuncio
        anuncio_1.save(function (err, result){

            if (err) {

                //console.log(err);
                console.log ('Carga de anuncio_1 realizada con errores...', err);
                return process.exit(1);
                //return res.json({ok:false, error: err});
            }

            //return res.json({ok:true, data: result});
            console.log ('Carga de modelo (anuncio_1) realizada con exito...', result);
            //return process.exit(0);

        });

        //Cargar el segundo anuncio
        var anuncio_2 = new Anuncio ({nombre: 'iPhone 3GS',
            venta: false,
            precio: 50.15,
            foto: 'iphone.jpg',
            tags: [ 'lifestyle', 'mobile'],
            fecalta: new Date()});

        //Crear un registro de Anuncio
        anuncio_2.save(function (err, result){

            if (err) {

                console.log ('Carga de anuncio_2 realizada con errores...', err);
                return process.exit(1);

            }

            //return res.json({ok:true, data: result});
            console.log ('Carga de modelo (anuncio_2) realizada con exito...', result);
            //return process.exit(0);
            done();

        });

    });

}

//Carga de Usuarios
function initUsuarios(done) { //done=cb

    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.remove({}, function() {

        // aqui cargaríamos al menos un usuario (Usuario.save)
        var usuario_1 = new Usuario ({nombre: 'Juan Antonio Sanchez Rodriguez',
            email: 'abc@gmail.com',
            clave: sha(passUser.pass),
            fecalta: new Date()});

        //Crear un registro de Anuncio
        usuario_1.save(function (err, result){

            if (err) {

                console.log ('Carga de modelo (usuario_1) realizada con errores...', err);
                return process.exit(1);
            }

            console.log ('Carga de modelo (usuario_1) realizada con exito...', result);
            done();

        });

    });
}
