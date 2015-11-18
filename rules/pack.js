'use strict';

module.exports = function(conf) {
    conf = conf || {};
    //conf.allInOne = conf.allInOne === undefined ? true : conf.allInOne;
    //conf.obtainScript = conf.obtainScript === undefined ? true : conf.obtainScript;
    //conf.obtainStyle = conf.obtainStyle === undefined ? true : conf.obtainStyle;
    //conf.resoucemap = conf.resoucemap;
    conf.useInlineMap = conf.useInlineMap === undefined ? true : conf.useInlineMap;
    
    return this
    .match('::package', {
        postpackager: fis.plugin('loader', conf)
    });
};
