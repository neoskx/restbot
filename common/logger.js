'use strict';

var winston = require('winston');

var config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};

var logger = module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    })
  ]
});

var log = {};
log.log = function(type, args){
  var defaultType = ['info'];
  if(typeof type != 'string'){
    args = Array.prototype.slice.call(type);
    args = defaultType.concat(args)
  }else{
    args = Array.prototype.slice.call(args);
    args = [type].concat(args);
  }

  logger.log.apply(logger, args);
}

log.info = function(){
  log.log('info', arguments);
}

log.error = function(){
  log.log('error', arguments);
}

log.warn = function(){
  log.log('warning', arguments);
}

log.debug = function(){
  log.log('debug', arguments);
}

module.exports = exports = log;
