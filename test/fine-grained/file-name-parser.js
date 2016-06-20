var chai = require('chai');
var expect = chai.expect;

var fileParser = require('../../lib/file-parser.js');

describe('File parser module', function() {
    describe('#isImage', function() {
        it('returns true for sample-file.jpg', function() {
            expect(fileParser.isImage('sample-file.jpg')).to.equal(true);
        });

        it('returns true for sample-file.png', function() {
            expect(fileParser.isImage('sample-file.png')).to.equal(true);
        });

        it('returns false for sample-file.txt', function() {
            expect(fileParser.isImage('sample-file.txt')).to.equal(false);
        });
    });
    describe('#getExtension', function() {
        it('returns jpeg when the extension is jpeg', function() {
            expect(fileParser.getExtension('sample-file.jpg')).to.equal('jpeg');
        });

        it('returns png when the extension is png', function() {
            expect(fileParser.getExtension('sample-file.png')).to.equal('png');
        });
    });
});
