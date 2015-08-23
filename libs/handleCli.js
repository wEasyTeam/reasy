exports.init = function(argv) {
    if (argv.R || argv.rules) {
        argv.R = (argv.R || argv.rules).toString();
        if (argv.R === 'true') argv.R = 'base';

        var rules = argv.R.split(',');

        for (var p in rules) {
            reasy.extend(rules[p]);
        }
        delete argv.R;
        delete argv.rules;
    }
    if (argv._.length === 0 && !(argv.h || argv.help || argv.v || argv.version)) {
        argv._ = ['release'];
        process.argv.splice(2, 0, 'release');
    }
    
    if (!(argv.d || argv.dest)) {
        argv.d = './dist';
    }

    delete argv.L;
    delete argv.live;
};
