'use strict';

module.exports = function(conf) {
    return this
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: conf || false
        })
    });
};
