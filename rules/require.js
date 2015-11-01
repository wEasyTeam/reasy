module.exports = function(config) {
   
    config['mode'] = 'amd';
    config['forwardDeclaration'] = false;
    return this
    .hook('amd', config)
    .match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'amd',
            useInlineMap: true // 资源映射表内嵌
        })
    });
};