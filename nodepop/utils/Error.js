'use strict';

exports.error = function (err, res){
        res.json({ok:false, error: err});
};