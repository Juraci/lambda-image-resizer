/* jslint node: true */
"use strict";

var fileNameParser = (function() {
    return {
        getExtension: function(fileName) {
            var splitedString = fileName.split('.');
            var extension = splitedString[splitedString.length - 1];
            if(extension === 'jpg') {
                extension = 'jpeg';
            }
            return extension;
        },
        isImage: function(fileName) {
            var extension = this.getExtension(fileName);
            return extension === 'jpeg' || extension === 'png';
        }
    };
})();

module.exports = fileNameParser;
