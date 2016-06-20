/*jslint node: true */
"use strict";

var fileParser = require('./lib/file-parser.js');
var s3Wrapper  = require('./lib/s3-wrapper.js');
var resizer    = require('./lib/resizer.js');
var config     = require('./config.js')();

exports.imageResizer = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    var s3Object = event.Records[0].s3.object;
    var bucketName = event.Records[0].s3.bucket.name;

    console.info('Object name: ' + s3Object.key);

    if(!fileParser.isImage(s3Object.key)) {
        console.info('File is not an image: ' + s3Object.key);
        callback(null);
    }

    var extension = fileParser.getExtension(s3Object.key);

    s3Wrapper.download({Bucket: bucketName, Key: s3Object.key}).then(function(response) {
        resizer.resize(response.Body, config).then(function(buffer) {
            if(!buffer) {
                console.info('File is already in the expected size');
                callback(null);
            } else {
                s3Wrapper.upload({
                    Bucket: bucketName,
                    Key: s3Object.key,
                    Body: buffer,
                    ContentType: 'image/' + extension,
                }).then(function(data) {
                    console.info('Image uploaded!');
                    callback(null);
                }).catch(function(err) {
                    console.error('Image upload error');
                    callback(err);
                });
            }

        }).catch(function(err) {
            callback(err);
        });
    }).catch(function(err) {
        callback(err);
    });
};
