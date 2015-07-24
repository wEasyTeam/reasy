var fis = module.exports = require('fis3');

fis.require.prefixes.unshift('reasy');
fis.cli.name = 'reasy';
fis.cli.info = require('./package.json');


//使用相对路径
fis.hook('relative');
fis.match('**', {
    relative: true
});

// 所有js, css 加 hash
fis.match('*.{js,css,less,scss}', {
    useHash: true
});

// 所有图片加 hash
fis.match('image', {
    useHash: true
});

// fis-parser-less
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('sass2', {
        outputStyle: 'expanded',
        sourceMap: false
    })
});

fis.match('**/_*.scss', {
    release: false
});

fis.match('**/*.{tpl,asp,html,htm}', {
    parser: fis.plugin('art-template', {
        native: false,
        define: {
            
        }
    })
});

fis.match('**/*.tpl', {
    release: false
});


fis.match('::package', {
    spriter: fis.plugin('csssprites')
});


//fis3-hook-module
fis.hook('module', {
    mode: 'cmd',

    // 记得设置这个。
    forwardDeclaration: true,

    baseUrl: './modules/',
    paths: {

    }
});

fis.match('modules/**.js', {
    isMod: true
});

fis.match('./modules/sea.js', {
  isMod: false
}, true);

fis.match('::packager', {
  postpackager: fis.plugin('loader')
});


fis.media('product')
.match('*.js', {
    optimizer: fis.plugin('uglify-js')
})

.match('*.{css,less}', {
    optimizer: fis.plugin('clean-css')
})

.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});
