module.exports = function() {
    return this
        .match('::package', {
            spriter: fis.plugin('csssprites')
        })
        // 进行图片合并
        .match('*.{css,less,scss}', {
            // 给匹配到的文件分配属性 `useSprite`
            useSprite: true
        })
};
