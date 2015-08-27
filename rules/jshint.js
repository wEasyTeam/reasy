module.exports = function(glob, config) {
    glob = glob || '**.js';
    config = config || {
        i18n: 'zh-CN',
        //jshint options
        es3: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true
    };

    config.ignored = config.ignored || [/(jquery|reasy|bootstrap|require|sea|shim|\\lib|\\component|\.min).*\.js/i];
    return this.match(glob, {
        lint: fis.plugin('jshint', config)
    });
};
