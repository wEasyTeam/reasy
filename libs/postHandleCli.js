exports.init = function(argv) {
    if (argv.R || argv.rules) {
        argv.R = (argv.R || argv.rules).toString();
        if (argv.R === 'true') argv.R = 'base';

        var rules = argv.R.split(',');

        for (var p in rules) {
            reasy.extend(rules[p]);
        }

    }

    if (argv['child-flag'] && (argv.L || argv.live)) {
        var ar = [
            'node',
            require('path').join(__dirname, 'startServer.js'),
            fis.config.get('port') || 8080,
            require('path').resolve(argv.d),
            'true'
        ].join(' ');

        //var sv = require('child_process').exec(ar);
        /*sv.stdout.on('data', function(data) {
            fis.log.info(data);
        });*/
    }

    //将自动应用的规则打印输出到控制台
    var args = 'reasy';

    for (var cl in argv) {
        args += ' -' + cl + ' ' + (argv[cl] instanceof Array ? argv[cl].join(' ') : argv[cl]); //如果是Array则join
    }

    console.info('Execute command: `' + args.replace(/(\ -_|\ true|\ false)/g, '') + '`'); //去除 -_  true false

    //清理fis3不识别的命令参数
    delete argv.R;
    delete argv.rules;
    delete argv.p;
    delete argv.port;
    //delete argv.L;
    //delete argv.live;
}
