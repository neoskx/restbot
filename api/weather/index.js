'use strict';

let url = require('url');
let _ = require('lodash');
let request = require("co-request");
// let request = require("request");
let Q = require("q");
let router = require('../../router');
let config = require('../../config');
let logger = require('../../common/logger');
let basePath = config.app.basePath;
let apikey = config.openweathermap_apikey;

router.get(basePath + "/weather/:query", getWeather);

function getRequest(urlString) {
  let deferred = Q.defer();
  request
    .get(urlString)
    .on('response', function(response) {
      console.log(response);
      deferred.resolve(response);
    })
    .on('error', function(err) {
      console.log(err);
      deferred.reject(err);
    })
  return deferred.promise;
}

function* getWeather(next) {
  let urlObj = {
    protocol: "http",
    host: "api.openweathermap.org",
    pathname: "/data/2.5/weather",
    query: {
      q: this.params.query,
      appid: apikey
    }
  }

  let urlString = url.format(urlObj);
  logger.info("urlString: ", urlString);

  // let result = yield getRequest(urlString);
  let result = yield request(urlString);

  let data = result&&result.body;
  console.log(typeof data);
  if(typeof data == 'string'){
    data = JSON.parse(data);
  }
  console.log(data);

  let city = data.name;
  let country = data.sys.country;
  let weather = data.weather[0].main;
  let description = data.weather[0].description;
  let temp = data.main.temp;
  let c = Math.ceil(temp-273.15);
  let f = Math.ceil((9/5)*c +32);

  let msg = city+", "+country+ ". Wather: "+weather+" - "+description+". Temp: "+c+ "°C/"+f+"°F";
  console.log(msg);
  this.body = {
    msg: msg
  };
  yield next;
}
