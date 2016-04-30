var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var sampleFile = './test/support/sample.jpg';
var downloader = require('../../lib/s3Wrapper.js');

describe('S3 wrapper module', function() {
    describe('#download', function() {
        // Creates a Bucket and inserts an image there
        beforeEach(function(done) {
            this.timeout(30000);

            var params = {
                Bucket: 'download-test-component',
                Key: 'sample.jpg',
                ContentType: 'image/jpeg',
                Body: fs.createReadStream(sampleFile),
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
                Key: 'sample.jpg',
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
                Key: 'sample.jpg',
            };

            return downloader.download(params)
            .then(function(response) {
                expect(response.ContentType).to.equal('image/jpeg');
            })
            .catch(function(err) {
                throw err;
            });
        });

    });
});
