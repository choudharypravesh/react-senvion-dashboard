 /*jslint node: true */
 'use strict';
 var Sequelize = require('sequelize');
 var fs = require('fs');
 var schema_dir = './schema/';
 var config = require('./config').mysql_conf;
 var connection1 = new Sequelize(config.database1, config.username, config.password, config);
 fs.readdir(schema_dir, function(err, files) {
     if (err) {
         console.log(err);
     } else {
         files = files.sort();
         console.log(files);
         for (var i = 0; i < files.length; i++) {
             var module_name = files[i].slice(0, -3);
             console.log(schema_dir + files[i]);
             //  var schema = require(schema_dir + module_name);
             try {
                 var model = connection['import']('' + schema_dir + module_name);
                 model.sync().then(function() {
                     console.log("table created: " + module_name);
                 });
             } catch (ex) {
                 console.log("error with module_name: " + module_name, ex);
             }
         }
     }

 });

 