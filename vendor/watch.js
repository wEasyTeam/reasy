var checkIgnore = require('./checkignore.js');
var _ = fis.util;
var chokidar = require('chokidar');
var util = require('util');
var path = require('path');

var patterns, root;

function isMaster() {
  var argv = process.argv;
  return !~argv.indexOf('--child-flag');
}

// 判断新加的文件是否满足用户指定。
function match(path) {

  if (!patterns) {
    patterns = fis.media().get('project.files', []);

    if (!Array.isArray(patterns)) {
      patterns = [patterns];
    }

    patterns = patterns.map(function(pattern) {
      var negate = false;

      if (pattern[0] === '!') {
        negate = true;
        pattern = pattern.substring(1);
      }

      pattern[0] === '/' && (pattern = pattern.substring(1));

      return {
        negate: negate,
        reg: _.glob(pattern)
      };
    });
  }

  path.indexOf(root) === 0 && (path = path.substring(root.length));

  var hitted = false;
  patterns.forEach(function(item) {
    if (hitted) {
      if (item.negate && item.reg.test(path)) {
        hitted = false;
      }
    } else {
      hitted = item.negate !== item.reg.test(path);
    }
  });

  return hitted;
}

var child_process = require('child_process');

// 当监听到 fis-conf.js 文件变化的时候，kill self 重启一个新进程。
function respawn() {
  var argv = process.argv;
  var child = child_process.spawn(argv[0], argv.slice(1).concat('--child-flag'));
  child.stderr.pipe(process.stderr);
  child.stdout.on('data', function(data) {
    if (~data.toString('utf-8').indexOf('Currently running fis3')) {
      return;
    }
    process.stdout.write(data);
  });
  child.on('exit', function(code, signal) {
    process.on('exit', function() {
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });
  return child;
}

function onFisConfChange(filename) {
  var argv = process.argv.slice(3);
  argv.pop();
  fis.log.info('Detect `' + filename + '` modified, respawn `%s release %s`.', fis.cli.name, argv.join(' '));
  process.exit();
}

var watcher;
var watchList = [];

function watch(options, next) {
  // 用子进程去 watch.
  if (isMaster()) {
    return (function() {
      var damen = arguments.callee;
      var child = respawn();

      child.on('exit', function(code) {
        code || damen();
      });
    })();
  }

  root = fis.project.getProjectPath();

  var opts = {
    usePolling: false,
    persistent: true,
    ignoreInitial: true,
    followSymlinks: false,
    ignored: function(filepath) {

      // normalize filepath
      filepath = filepath.replace(/\\/g, '/');
      filepath.indexOf(root) === 0 && (filepath = filepath.substring(root.length));

      // todo 暂时不支持 -f 参数指定其他配置文件。
      if (filepath === '/reasy-conf.js' || filepath === '/fis-conf.js') {
        return false;
      }

      return checkIgnore(filepath);
    }
  };

  _.assign(opts, fis.get('project.watch', {}));

  var busy = false;
  var timer;

  function done(error, ret) {
    busy = false;

    if (!error) {

      // 将所有相关的文件，都加入 watchList
      Object.keys(ret.modified).forEach(function(filepath) {
        var file = ret.modified[filepath];

        filepath = fis.util(root, filepath);
        ~watchList.indexOf(filepath) || watchList.push(filepath);

        file.links.forEach(function(filepath) {
          filepath = fis.util(root, filepath);
          ~watchList.indexOf(filepath) || watchList.push(filepath);
        });

        if (file.cache) {
          _.forEach(file.cache.deps, function(mtime, filepath) {
            ~watchList.indexOf(filepath) || watchList.push(filepath);
          });
        }
      });

      process.stdout.write(util.format(' [%s]\n'.grey, fis.log.now()))
    }
  }

  var files = fis.project.getSource();
  options.srcCache = options.srcCache || [];
  fis.util.map(files, function(subpath, file) {
    options.srcCache.push(file.realpath);
  });

  var safePathReg = /[\\\/][_\-.\s\w]+$/i;

  function listener(type) {
    return function(path) {

      if (path && safePathReg.test(path)) {
        var modified = false;

        path = fis.util(path);

        if (path === root + '/reasy-conf.js') {
          return onFisConfChange('reasy-conf.js');
        } else if (path === root + '/fis-conf.js') {
          return onFisConfChange('fis-conf.js');
        }

        fis.log.debug('Watch Event %s, path: %s', type, path);

        if (~watchList.indexOf(path)) {
          modified = true;
        }

        if (type === 'add' || type === 'change') {
          ~options.srcCache.indexOf(path) || match(path) &&
            (options.srcCache.push(path), modified = true);
        } else if (type === 'unlink') {
          var idx = watchList.indexOf(path);

          if (~idx) {
            watchList.splice(idx, 1);
            modified = true;
          }

          idx = options.srcCache.indexOf(path);

          if (~idx) {
            options.srcCache.splice(idx, 1);
            modified = true;
          }
        } else if (type === 'unlinkDir') {
          var toDelete = [];

          watchList.forEach(function(realpath, index) {
            if (realpath.indexOf(path) === 0) {
              toDelete.unshift(index);
            }
          });

          toDelete.forEach(function(index) {
            watchList.splice(index, 1);
            modified = true;
          });

          toDelete = [];
          options.srcCache.forEach(function(realpath, index) {
            if (realpath.indexOf(path) === 0) {
              toDelete.unshift(index);
            }
          });

          toDelete.forEach(function(index) {
            options.srcCache.splice(index, 1);
            modified = true;
          });
        }

        // Nothing happend!
        if (!modified) {
          return;
        }
      }

      if (busy) return;

      if (type === 'inital') {
        busy = true;
        next(null, options, done);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
          busy = true;
          next(null, options, done);
        }, 200);
      }
    }
  }

  watcher = chokidar
    .watch(root, opts)
    .on('add', listener('add'))
    .on('change', listener('change'))
    .on('unlink', listener('unlink'))
    .on('unlinkDir', listener('unlinkDir'))
    .on('error', function(err) {
      err.message += fis.cli.colors.red('\n\tYou can set `fis.config.set("project.watch.usePolling", true)` fix it.');
      fis.log.error(err);
    });

  opts.ignoreInitial && listener('inital')();
}

module.exports = watch;
