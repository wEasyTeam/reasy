module.exports = function() {
    return this
        .match('**.js', {
            optimizer: fis.plugin('uglify-js', {
                mangle: {
                    expect: ['require', 'define'] //不想被压缩的关键字
                }
            })
        })
        .match('**.{css,scss,less}', {
            optimizer: fis.plugin('clean-css')
        })
        .match('**.png', {
            optimizer: fis.plugin('png-compressor')
        })
};
