module.exports = function(argv) {
      if (argv['child-flag']) {
            var port = fis.config.get('port');
            if (port || fis.config.get('web-debug')) {
                  var ar = [
                      'node',
                      require('path').join(__dirname, 'startServer.js'),
                      port || 8080,
                      require('path').resolve(argv.d),
                      'true'
                  ].join(' ');

                  var sv = require('child_process').exec(ar);
                  sv.stdout.on('data', function(data) {
                      fis.log.info(data);
                  });
                  delete argv.L;
                  delete argv.live;
            } 
      }
}