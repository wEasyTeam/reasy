#!/usr/bin/env node
//install tiny-http as http server
require('child_process').exec('http', function (error, stdout, stderr) {
   if (error) {
      console.log('Installing tiny-http...');
      require('child_process').exec('npm install -g tiny-http', function(error) {
        if (!error) {
            console.log('Installing Success!');
        }
      });
   }
});
