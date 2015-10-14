module.exports = function(args) {
    return this
        .match('**.less', {
            parser: fis.plugin('less'),
            rExt: '.css'
        })
        .match('**/minix/**.less', {
            release: false
        })
        .match('**.scss', {
            rExt: '.css', // from .scss to .css
            parser: fis.plugin('sass')
        })
        .match('**/_*.scss', {
            release: false
        })
        .match('**.{asp,html,htm,tpl}', {
            parser: fis.plugin('art-template', {
                native: false,
                define: args ? args.define : {}
            })
        })
        .match('**.jsm', {
            parser: fis.plugin('js-macro'),
            isJsLike: true
        })
        .match('*.tpl', {
            release: false
        })
        .match('**.jsx', {
            parser: 'reactjs',
            rExt: 'js'
        })
        .match('*:jsx', {
            parser: 'reactjs'
        })
        ;
};
