module.exports = function() {
    return this
        .match('**.jsx', {
            parser: 'reactjs',
            rExt: 'js'
        })
        .match('*:jsx', {
            parser: 'reactjs'
        })
        .config.set('port', 8080);
}
