#!/usr/bin/env node
//install web-debug as http server
require('child_process').exec('web-debug', function (error, stdout, stderr) {
   if (error) {
      console.log('Link web-debug...');
      require('child_process').exec('cd node_modules/web-debug/&&npm link', function(error) {
        if (!error) {
            console.log('link Success!');
        } else {
            console.log('link Error! ' + error);
        }
      });
   }
});
