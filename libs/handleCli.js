exports.init = function(argv) {
    if (argv.m || argv.media) {
        //console.log(reasy.extend)
        //
        argv.m = (argv.m || argv.media).toString();
        if (argv.m === 'true')argv.m = 'base';

        var medias = argv.m.split(',');
        //console.log(medias);
        for (var m in medias) {
            reasy.extend(medias[m]);
        }
        delete argv.m;
        delete argv.media;
    }
    delete argv.L;
    delete argv.live;
}