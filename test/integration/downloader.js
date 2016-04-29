var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var fs = require('fs');
chai.use(sinonChai);

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var sampleFile = './test/support/sample.jpg';
var downloader = require('../../lib/downloader.js');

describe('download', function() {
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
            console.log('----> Bucket created');
            s3.putObject(params, function(err, data) {
                if(err) throw err;
                console.log('----> Sample file uploaded');
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
            console.log('----> Sample file deleted');
            s3.deleteBucket({Bucket: params.Bucket}, function(err, data) {
                if(err) throw err;
                console.log('----> Bucket deleted');
                done();
            });
        });
    });

    it('should download the image', function(done) {
        this.timeout(10000);

        var params = {
            Bucket: 'download-test-component',
            Key: 'sample.jpg',
        };

        downloader.download(params, function(err, response) {
            expect(err).to.equal(null);
            expect(response.ContentType).to.equal('image/jpeg');
            done();
        });
    });
});
