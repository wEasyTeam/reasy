module.exports = function(platform) {
    return this.match('**.css', {
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": platform && platform === 'mobile' ? ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"] : ["last 30 versions"],
            "cascade": true,
            "remove": true
        })
    });
};