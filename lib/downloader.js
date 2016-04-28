var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.download = function(params, callback) {
    return s3.getObject(params, callback);
};
