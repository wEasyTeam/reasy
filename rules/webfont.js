var path = require('path');

module.exports = function(src, dist, distCss) {
    var ignore;
    src = src || 'fonts/*.svg';
    dist = dist || './fonts/compile';
    distCss = distCss || dist;

    var ret = this
        .hook('webfont', {
            src: src, //['./fonts/home2.svg', './fonts/home3.svg'],//图标目录
            destCss: distCss, //srct和dest建议不要相同
            dest: dist, //产出字体目录
            order: 'name', //name或者time //图标按名称还是按修改时间排序，默认按名称排序
            hashes: false, //建议为false, ie等浏览器有bug
            syntax: 'bootstrap',
            types: 'eot,svg,woff,ttf'
        });

    /*if (src instanceof Array) {
        ignore = path.dirname(src[0]) + '/*.svg';
    } else if (src !== dist && src !== distCss) {
        ignore = path.dirname(src) + '/*.svg';
    }*/

    /*if (ignore) {
        ret = ret.match(ignore, {
            release: 'deleted'
        });
    }*/
    return ret;
}
