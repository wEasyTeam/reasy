module.exports = function(platform) {
    return this.match('**.{css,less,scss}', {
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": platform && platform === 'mobile' ? ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"] : ["> 1%", "IE > 7"],
            "cascade": true,
            "remove": true,
            "add": true
        })
    });
};
