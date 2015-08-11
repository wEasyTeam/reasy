#!/usr/bin/env node
 //install web-debug as http server
 
var path = require('path'),
fs = require('fs');
var root = path.join(process.cwd());//node_modules/reasy
function install() {
    require('child_process').exec('web-debug', function(error, stdout, stderr) {
            if (error) {
                console.log('Link web-debug...');

                require('child_process').exec('cd ' + path.join(root, '/node_modules/web-debug/') + '&&npm link', function(error) {
                  if (!error) {
                        console.log('link Success!');
                    } else {
                        console.log('link Error! ' + error);
                    }
                });
        }
    });
}

function replace() {
    var dist = path.join(root, 'node_modules/fis3/node_modules/fis3-command-release/lib/watch.js'),
    vendor = path.join(root, 'vendor/watch.js');
    
    fs.rename(dist, dist + '.bak', function(err){
      if (!err) {
        fs.writeFileSync(dist, fs.readFileSync(vendor));
      }
    });

}

replace();
install();

