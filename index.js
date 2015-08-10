var reasy = module.exports = require('fis3');



reasy.require.prefixes.unshift('reasy');
reasy.cli.name = 'reasy';
reasy.cli.info = require('./package.json');
reasy.cli.configName = 'reasy-conf';

// register global variable
Object.defineProperty(global, 'reasy', {
  enumerable: true,
  writable: false,
  value: reasy
});

reasy.extend = reasy.config.Config.prototype.extend = function(module, args) {
    try {
        var modules = require('./rules/' + module);
        return modules.apply(this, args);
    } catch (e) {
        fis.log.error('extended rules "' + module + '" not exist!');
    }
};

reasy.set('project.ignore', ['node_modules/**', '.svn/**', 'output/**', 'dist/**', '.git/**', 'reasy-conf.js', 'fis-conf.js', 'rules/**']);


/**
 *  针对 fis3语法进行了进一步简化，可以使用reasy.extend继承已经封装好的解析规则，如下
 *  可用规则在rules目录下
 reasy.extend('base').extend('compress').extend('hash').extend('parse', [{
     define: {
         product: 'Tenda'
     }
 }]);
 * 
 */
reasy.extend('base');
