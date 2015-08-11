module.exports = function() {
    return this
    .match('**.{css,js}', {
        useHash: true
    });
};
