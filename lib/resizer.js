var gm = require('gm').subClass({imageMagick: true});
var Promise = require('es6-promise').Promise;
var expectedSize = 640;

exports.resize = function(buffer) {
    return new Promise(function(resolve, reject) {
        gm(buffer).size(function(err, size) {
            if(err) {
                reject('gm.size method error: \n' + err);
            }
            if(Math.max(size.width, size.height) <= expectedSize) {
                resolve(false);
            } else {
                this.resize(expectedSize, expectedSize).toBuffer('JPG', function(err, buffer) {
                    if(err) {
                        reject('gm.resize method error: \n' + err);
                    } else {
                        resolve(buffer);
                    }
                });
            }
        });
    });
};
