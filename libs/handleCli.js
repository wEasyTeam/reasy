exports.init = function(argv) {
    if (argv.r || argv.rules) {
        argv.r = (argv.r || argv.rules).toString();
        if (argv.r === 'true')argv.r = 'base';

        var rules = argv.r.split(',');

        for (var p in rules) {
            reasy.extend(rules[p]);
        }
        delete argv.r;
        delete argv.rules;
    }

    delete argv.L;
    delete argv.live;
}