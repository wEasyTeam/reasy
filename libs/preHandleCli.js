exports.init = function(argv) {
    
    if (argv._.length === 0 && !(argv.h || argv.help || argv.v || argv.version)) {
        argv._ = ['release'];
        process.argv.splice(2, 0, 'release');
    }
    
    if (!(argv.d || argv.dest)) {
        argv.d = './dist';
    }

    if (!(argv.r || argv.root)) {
        if (require('fs').existsSync(process.cwd() + '/src')) {
            argv.r = argv.root = './src';
        }
    }

    return argv;
};
