module.exports = function(moduleDir, paths) {
    moduleDir = moduleDir || '/modules/';
    paths = paths || {};
    return this.hook('module', {
        mode: 'cmd',

        // 记得设置这个。
        forwardDeclaration: true,

        baseUrl: moduleDir,
        paths: paths
    });

    .match(moduleDir + '**.js', {
        isMod: true
    })

    .match(moduleDir + 'sea.js', {
      isMod: false
    }, true)

    .match('::packager', {
      postpackager: fis.plugin('loader')
    });
}