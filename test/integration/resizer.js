var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

var resizer = require('../../lib/resizer.js');
var gm = require('gm').subClass({imageMagick: true});

describe('Resizer module', function() {
    describe('#resize', function() {
        describe('when the image format is jpg', function() {
            var largeImage = './test/support/largerThan640.jpg';
            var readStream = fs.createReadStream(largeImage);

            it('should resize the image larger than 640p', function(done) {
                this.timeout(10000);
                return resizer.resize(readStream)
                .then(function(buffer) {
                    gm(buffer).size(function(err, size) {
                        expect(Math.max(size.width, size.height)).to.be.at.most(640);
                        done();
                    });
                })
                .catch(function(err) {
                    throw err;
                });
            });
        });
    });
});
