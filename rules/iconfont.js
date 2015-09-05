module.exports = function(args) {
    return this.hook('iconfont', {
        'fonts': '**.svg', //图标目录
        'destFont': 'fonts_release', //产出字体目录
        'fontName': 'reasy_font', //产出字体名称
        'destHtml': 'fonts_release/demo.html'
    });
}
