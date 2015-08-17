var fs = require('fs');
exports.name = 'rules';
exports.usage = '';
exports.desc = 'list rules';

function listRules() {
  fs.readdir(global.cwd + '/rules/', function(error, files) {
    if (files && files.length > 0) {
      fis.log.info('Exist Custom Rules:\r\n');
      console.log(files.join('\r\n').replace(/\.js(\r\n|$)/g, '\r\n'));
    } else {
      //fis.log.warn('Not find Custom Rules!');
    }
  });

  fs.readdir(fis.get('system.globalNPMFolder') + '/rules/', function(error, files) {
    if (files && files.length > 0) {
      fis.log.info('Exist Sys Rules:\r\n');
      console.log(files.join('\r\n').replace(/\.js(\r\n|$)/g, '\r\n'));
    } else {
      fis.log.warn('Not find Exist Rules!');
    }
  });
}


exports.register = function(commander) {
    listRules();
};
