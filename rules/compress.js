module.exports = function() {
    return this
        .match('**.{js.jsx}', {
            optimizer: fis.plugin('uglify-js', {
                mangle: false,
                compress: {
                    drop_console: true
                }
            })
        })
        .match('**.{css,scss,less,styl}', {
            optimizer: fis.plugin('clean-css')
        })
        .match('**.png', {
            optimizer: fis.plugin('png-compressor')
        })
};
