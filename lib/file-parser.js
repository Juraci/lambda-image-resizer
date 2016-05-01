/* jslint node: true */
"use strict";

var fileNameParser = (function() {
    return {
        isImage: function(fileName) {
            var splitedString = fileName.split('.');
            var extension = splitedString[splitedString.length - 1];

            if(extension === 'jpg' || extension === 'png') {
                return true;
            } else {
                return false;
            }
        }
    };
})();

module.exports = fileNameParser;
