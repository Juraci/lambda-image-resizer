var getObjectWrapper = function(s3) {
    return {
        get: function(params, callback) {
            return s3.getObject(params, callback);
        }
    };
};

module.exports = getObjectWrapper;
