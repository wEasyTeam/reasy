
exports.init = function(argv, env) {
    if (require('./filterCommand')(argv._[0]) && !(argv.R || argv.rules) && !env.configPath) {//如果没有任何规则，且没有fis-conf配置文件，则添加默认规则为`compress,parse`
        argv.R = 'parse,compress';
    }
}