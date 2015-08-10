module.exports = function(bool) {
    return this.hook('relative')
    .match('**', {
        relative: bool === false ? false : true
    })
};
