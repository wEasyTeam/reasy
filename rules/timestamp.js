
module.exports = function() {
    var now = new Date(); 
    fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join('')); 
    return this.match('**.{js,css,scss,less}', {
        query: '?t=${timestamp}'
    });
};