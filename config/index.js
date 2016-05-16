'use strict';

var path = require('path');

let rootPath = path.normalize(__dirname + '/..');
var config = {
  rootPath: rootPath,
  app: {
    basePath: '/api/v1',
    port: process.env.PORT || 3456,
    cacheTime: 0 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
  },
  openweathermap_apikey: "1ced48fef5d3e4260a0a4ccd9bf8a8f3"
}

module.exports = exports = config;
