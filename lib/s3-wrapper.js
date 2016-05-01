/*jslint node: true */
"use strict";

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var Promise = require('es6-promise').Promise;

var s3Wrapper = (function() {
    return {
        download: function(params) {
            return new Promise(function(resolve, reject) {
                s3.getObject(params, function(err, response) {
                    if(err) {
                        reject('S3.getObject error: ' + err);
                    } else {
                        resolve(response);
                    }
                });
            });
        },
        upload: function(params) {
            return new Promise(function(resolve, reject) {
                s3.putObject(params, function(err, data) {
                    if(err) {
                        reject('S3.putObject error: ' + err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    };
})();

module.exports = s3Wrapper;
