var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var fileName = 'sample.jpg';
var filePath = './test/support/' + fileName;
var s3Wrapper = require('../../lib/s3-wrapper.js');

describe('S3 wrapper module', function() {
    describe('#download', function() {
        // Creates a Bucket and inserts an image there
        beforeEach(function(done) {
            this.timeout(30000);

            var params = {
                Bucket: 'download-test-component',
                Key: fileName,
                ContentType: 'image/jpeg',
                Body: fs.createReadStream(filePath),
                ACL: 'public-read-write'
            };

            s3.createBucket({Bucket: params.Bucket}, function(err, data) {
                if(err) throw err;
                s3.putObject(params, function(err, data) {
                    if(err) throw err;
                    done();
                });
            });
        });

        // Deletes the image and the Bucket
        afterEach(function(done) {
            this.timeout(30000);

            var params = {
                Bucket: 'download-test-component',
                Key: fileName,
            };

            s3.deleteObject(params, function(err, data) {
                if(err) throw err;

                s3.deleteBucket({Bucket: params.Bucket}, function(err, data) {
                    if(err) throw err;
                    done();
                });
            });
        });

        it('should download the image from the S3 bucket', function() {
            this.timeout(30000);

            var params = {
                Bucket: 'download-test-component',
                Key: fileName
            };

            return s3Wrapper.download(params)
            .then(function(response) {
                expect(response.ContentType).to.equal('image/jpeg');
            })
            .catch(function(err) {
                throw err;
            });
        });
    });

    describe('#upload', function() {
        var bucketName = 'upload-test-component';

        // Creates the Bucket
        beforeEach(function(done) {
            this.timeout(30000);
            s3.createBucket({Bucket: bucketName}, function(err, data) {
                if(err) throw err;
                done();
            });
        });

        // Deletes the image and the Bucket
        afterEach(function(done) {
            this.timeout(30000);

            var params = {
                Bucket: bucketName,
                Key: fileName
            };

            s3.deleteObject(params, function(err, data) {
                if(err) throw err;

                s3.deleteBucket({Bucket: params.Bucket}, function(err, data) {
                    if(err) throw err;
                    done();
                });
            });
        });

        it('should upload the image to the S3 bucket', function(done) {
            this.timeout(30000);

            var params = {
                Bucket: bucketName,
                Key: fileName,
                ContentType: 'image/jpeg',
                Body: fs.createReadStream(filePath),
                ACL: 'public-read-write'
            };

            return s3Wrapper.upload(params)
            .then(function(data) {
                s3.headObject({Bucket: bucketName, Key: fileName}, function(err, data) {
                     expect(err).to.be.equal(null);
                     expect(data.ContentType).to.equal('image/jpeg');
                     done();
                });
            })
            .catch(function(err) {
                throw err;
            });

        });
    });
});
