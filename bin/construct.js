#!/usr/bin/env node
 //install web-debug as http server

var path = require('path'),
    fs = require('fs');
var root = path.join(process.cwd()); //node_modules/reasy
function install() {
    console.log('Install web-debug...');

    require('child_process').exec('npm install -g web-debug', function(error) {
        if (!error) {
            console.log('Install Success!');
        } else {
            console.log('Install Failed! ' + error);
            console.log('\nPlease install it manually!');
        }
    });
}

function replace() {
    var dist = path.join(root, 'node_modules/fis3/node_modules/fis3-command-release/lib/watch.js'),
        vendor = path.join(root, 'vendor/watch.js');
    if (!fs.existsSync(dist)) {//如果不存在，则可能是新版npm
        dist = path.join(root, 'node_modules/fis3-command-release/lib/watch.js');
    }
    fs.rename(dist, dist + '.bak', function(err) {
        if (!err) {
            fs.writeFileSync(dist, fs.readFileSync(vendor));
        }
    });

}

replace();
//install();
