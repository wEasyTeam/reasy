function replacer(opt) {
    if (!opt)return;
    if (!Array.isArray(opt)) {
        opt = [opt];
    }
    var r = [];
    opt.forEach(function(raw) {
        if (!raw.to)return;
        if (!raw.from) {//如果没有定义from,则使用local-deliver
            r.push(fis.plugin('local-deliver', raw));
        } else {
            r.push(fis.plugin('replace', raw));
        }  
    });
    return r;
}

/*
 args example
 [
     {
        to: '/home/xxx/webs'
     },
     {
         from: 'a',
         to: 'b',
     },
     {
         from: 'a0',
         to: 'b0'
     }
 ]*/


module.exports = function(args) {
    return this.match('**', {
        deploy: replacer(args)
    });
};
