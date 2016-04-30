var gm = require('gm').subClass({imageMagick: true});
var Promise = require('es6-promise').Promise;

exports.resize = function(buffer) {
    return new Promise(function(resolve, reject) {
        gm(buffer).resize(640, 640).toBuffer('JPG', function(err, buffer) {
            if(err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
};
