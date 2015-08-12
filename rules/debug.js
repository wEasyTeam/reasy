module.exports = function() {
    return this
        .match('*.{js,css,scss,less,png}', {
            useHash: false,
            useSprite: false,
            optimizer: null
        }, true);
}
