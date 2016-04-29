var gm = require('gm').subClass({imageMagick: true});

exports.resize = function(buffer, callback) {
    gm(buffer)
    .resize(640, 640)
    .toBuffer('PNG', function(err, buffer) {
        if(err) throw err;
        return callback(err, buffer);
    });
};
