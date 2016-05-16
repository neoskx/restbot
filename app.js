'use strict';
var koa = require('koa');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');
var router = require('./router');

var app = module.exports = koa();

var corsOptions = {
	origin: '*'
}

app
  .use(cors(corsOptions))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err){
  console.error('server error', err);
});
