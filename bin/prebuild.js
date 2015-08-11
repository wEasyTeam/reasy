#!/usr/bin/env node
//install web-debug as http server
require('child_process').exec('web-debug', function (error, stdout, stderr) {
   if (error) {
      console.log('Installing web-debug...');
      require('child_process').exec('npm install -g web-debug', function(error) {
        if (!error) {
            console.log('Installing Success!');
        }
      });
   }
});