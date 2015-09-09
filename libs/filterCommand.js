var defalutCommand = ['release', 'inspect', 'rules', 'server', 'init'];
//可以应用自动规则的命令


module.exports = function(command) {//检查是否属于以上规则
    return defalutCommand.some(function(key) {
        if (key === command) return true;
    });
}