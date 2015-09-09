var fs = require('fs'),
    path = require('path');


exports.init = function(argv) {

    if (argv._.length === 0 && !(argv.h || argv.help || argv.v || argv.version)) {
        argv._ = ['release'];
        process.argv.splice(2, 0, 'release');
    }

    if (require('./filterCommand')(argv._[0])) {
        var dest = argv.d || argv.dest,
            root = argv.r || argv.root;

        if (!dest) {
            argv.d = './dist';
        }

        if (!root) { //如果没有指定root和dest,且当前目录下有src目录,则将root指向./src,dest指向../dist,与root同级
            if (fs.existsSync(process.cwd() + '/src')) {
                argv.r = './src';
            } else if (!dest) {
                argv.d = '../dist';
            }
        }

        if (argv.contextmenu || argv.cm) {
            //如果从右键启动编译,并且root为绝对路径,
            //如果当前目录下没有src目录,则dest指向../dist
            //否则root指向./src
            if (path.isAbsolute(root)) {
                if (!fs.existsSync(path.join(root, './src'))) {
                    if (!dest) argv.d = '../dist';
                    delete argv.r; //右键编译时当前目录已经无需指定-r
                } else {
                    argv.r = './src';
                    delete argv.root;
                }
            }
            argv.c = true;

            delete argv.contextmenu;
            delete argv.cm;
        }
    } else {
        delete argv.contextmenu;
        delete argv.cm;
    }

    return argv;
};
