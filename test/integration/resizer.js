var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var fs = require('fs');
chai.use(sinonChai);

var resizer = require('../../lib/resizer.js');
var gm = require('gm').subClass({imageMagick: true});
var largeImage = './test/support/largerThan640.jpg';

describe('resize', function() {
    it('should resize the image larger than 640p', function(done) {
        this.timeout(10000);
        var readStream = fs.createReadStream(largeImage);
        resizer.resize(readStream, function(err, buffer) {
            expect(err).to.equal(null);

            gm(buffer).size(function(err, size) {
                expect(Math.max(size.width, size.height)).to.be.at.most(640);
                done();

                /* to actually write the new image
                var newFile = fs.createWriteStream('./test/support/resised-img.jpg');
                newFile.write(buffer, function(err) {
                    if(err) throw err;
                    done();
                });
                */
            });
        });
    });
});
