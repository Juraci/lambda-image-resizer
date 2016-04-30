var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var Promise = require('es6-promise').Promise;

exports.download = function(params) {
    return new Promise(function(resolve, reject) {
        s3.getObject(params, function(err, response) {
            if(err) {
                reject('S3.getObject error: ' + err);
            } else {
                resolve(response);
            }
        });
    });
};
