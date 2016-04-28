var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var fs = require('fs');
chai.use(sinonChai);

var AWS = require('aws-sdk');
var params = {
    Bucket: 'download-test-component',
    Key: 'sample.jpg',
    ContentType: 'image/jpeg'
};

var sampleFile = '../support/sample.jpg';

describe('download', function() {
    beforeEach(function(done) {
        this.timeout(10000);
        var s3 = new AWS.S3();
        s3.createBucket({Bucket: params.Bucket}, function(err, data) {
            if(err) throw err;
            fs.createReadStream(sampleFile).pipe(s3.putObject(params, function(err, data) {
                if(err) throw err;
                console.log(data);
                done();
            }));
        });
    });

    it('should get the image', function(done) {
        this.timeout(10000);
        var downloader = require('../../lib/downloader.js');
        downloader.download(params, function(err, response) {
            expect(err).to.equal(null);
            expect(response.ContentType).to.equal('image/jpeg');
            done();
        });
    });
});
