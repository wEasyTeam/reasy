module.exports = function() {
    return this
        .match('**.{css,scss,less,js}', {
            useHash: true
        });
};
