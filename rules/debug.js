module.exports = function() {
    return this
    .match('*.{js,css,png}', {
      useHash: false,
      useSprite: false,
      optimizer: null
    }, true);
}