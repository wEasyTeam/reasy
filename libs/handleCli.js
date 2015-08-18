exports.init = function(argv) {
    if (argv.R || argv.rules) {
        argv.R = (argv.R || argv.rules).toString();
        if (argv.R === 'true')argv.R = 'base';

        var rules = argv.R.split(',');

        for (var p in rules) {
            reasy.extend(rules[p]);
        }
        delete argv.R;
        delete argv.rules;
    }

    delete argv.L;
    delete argv.live;
}