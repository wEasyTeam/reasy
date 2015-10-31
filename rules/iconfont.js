module.exports = function(conf) {
    conf = conf || {};
    conf.fonts = conf.fonts || '**.svg';
    conf.destFont = conf.destFont || 'fonts';
    conf.fontName = conf.fontName || 'icon-font';
    conf.destCss = conf.destCss || require('path').join(conf.destFont, 'font.css');
    conf.iconClass = conf.iconClass || 'icon-font';
    conf.placeholder = conf.placeholder || 'iconfont';
    conf.destHtml = conf.destHtml !== undefined ? conf.destHtml : 'fonts/demo.html';
    return this.hook('iconfont', conf);
}
