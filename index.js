'use strict';

var logger = require('./common/logger');
var config = require('./config');
var api = require('./api');
var app = module.exports = require('./app');

if (!module.parent) {
  var port = config.app.port;
  console.log("port: ", port);
  app.listen(port, function (err) {
    if (err){
      throw err
    }

    logger.info("Sever listen to port : ", port);
  })
}
