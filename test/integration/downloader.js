var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var AWS = require('aws-sdk');
var params = {
    Bucket: 'cgcdn-img',
    Key: 'nation/users/huebr.gif'
};

describe('download', function() {
    beforeEach(function(done) {
        this.timeout(10000);
        var s3 = new AWS.S3();
        s3.headObject(params, function(err, data) {
            if(err) throw err;
            done();
        });
    });

    it('should get the image', function(done) {
        this.timeout(10000);
        var downloader = require('../../lib/downloader.js');
        downloader.download(params, function(err, response) {
            expect(err).to.equal(null);
            expect(response.ContentType).to.equal('image/gif');
            done();
        });
    });
});
