'use strict';

exports.error = function (err, res){
        console.error(err.message);
        res.json (err);
};