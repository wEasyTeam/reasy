module.exports = function(dir) {
    dir = dir || 'modules' 
    // npm install [-g] fis3-hook-module
    return this.hook('module', {
        mode: 'commonJs'
    })
    .match('/' + dir + '/**/*.js', {
        isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    })
    .match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'commonJs',
            useInlineMap: true // 资源映射表内嵌
        })
    })
};