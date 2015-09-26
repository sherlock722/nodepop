"use strict";

//var db = require('../connection/dbmongo');

var mongoose = require('mongoose');
var db = mongoose.connection;
var readLine = require('readline');
var async = require('async');

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


function runInstallScript() {

    async.series([
        initAnuncios,
        //initUsuarios
        ], function(err, results) {
            if (err) {
                console.error('Hubo un error: ', err);
                return process.exit(1);
            }
            return process.exit(0);
        }
    );

}

function initAnuncios(cb) {
    //var Anuncio = mongoose.model('Anuncio');

    //Definir esquema del anuncio
    var anuncioSchema = mongoose.Schema({
        nombre: String,
        venta: Boolean,
        precio: Number,
        foto: String,
        tags: [String]
    });

    var Anuncio = mongoose.model('Anuncio', anuncioSchema);

    // elimino todos los registros y el callback crea los nuevos anuncios
    Anuncio.remove({}, function(res, req, next) {


        // aqui cargaríamos el json de anuncios (readFile, JSON.parse, iterar con Anuncio.save...)
        var anuncio1 = new Anuncio ({nombre: "Bicicleta",
            venta: true,
            precio: 230.15,
            foto: "bici.jpg",
            tags: [ "lifestyle", "motor"]});

        //Crear un registro de Anuncio
        anuncio1.save(function (err, result){

            if (err) {
                //console.log(err);
                console.log ('Carga de modelo realizada con errores...', err);
                //return process.exit(0);
                //return res.json({ok:false, error: err});
            }

            //res.json({ok:true, data: result});
            console.log ('Carga de modelo realizada con exito...', result);
            //return process.exit(0);


        });

        //Cargar el segundo anuncio
        var anuncio2 = new Anuncio ({nombre: "iPhone 3GS",
            venta: false,
            precio: 50.15,
            foto: "iphone.jpg",
            tags: [ "lifestyle", "mobile"]});

        //Crear un registro de Anuncio
        anuncio2.save(function (err, result){

            if (err) {
                //console.log(err);
                console.log ('Carga de modelo realizada con errores...', err);
                return process.exit(0);
                //return res.json({ok:false, error: err});
            }

            //res.json({ok:true, data: result});
            console.log ('Carga de modelo realizada con exito...', result);
            return process.exit(0);
            //

        });

    });

}
function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.remove({}, function() {

        // aqui cargaríamos al menos un usuario (Usuario.save)

    });
}*/
