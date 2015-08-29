exports.init = function(argv) {
    
    if (argv._.length === 0 && !(argv.h || argv.help || argv.v || argv.version)) {
        argv._ = ['release'];
        process.argv.splice(2, 0, 'release');
    }
    
    var dest = argv.d || argv.dest;
    if (!dest) {
         argv.d = './dist';
    }

    if (!(argv.r || argv.root)) {
        if (require('fs').existsSync(process.cwd() + '/src')) {
            argv.r = './src';
        } else if (!dest) {
            argv.d = '../dist';
        }
    }
    var args = 'reasy';
    for (var cl in argv) {
        args += ' -' + cl + ' ' + argv[cl];
    }


    console.info('exec command: `' + args.replace(/(\ -_|\ true|\ false)/g, '') + '`');

    return argv;
};
