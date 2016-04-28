var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);


describe('getObjectWrapper', function() {

    it('should call s3 with bucket name, the key name and the callback function', function() {
        var fakeS3 = { getObject: sinon.spy() };
        var getObjectWrapper = require('../../lib/getObjectWrapper.js')(fakeS3);
        var params = {
            bucket: 'images',
            key: 'foo.png'
        };
        var callback = function(){};

        getObjectWrapper.get(params, callback);
        expect(fakeS3.getObject).to.have.been.calledWith(params, callback);
    });
});
