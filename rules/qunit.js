module.exports = function(globArray) {
    globArray = globArray || ['test/*.html'];
    return this.
      match('::packager', {
        postpackager: fis.plugin('qunit', {
          all: globArray
        })
      })
};
