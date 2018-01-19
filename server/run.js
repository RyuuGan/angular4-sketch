'use strict';

const cluster = require('cluster')
  , trace = require('debug')('app:trace')
  , mongoose = require('mongoose')
  , conf = require('./conf');

process.env.TZ = 'UTC+0';
mongoose.Promise = Promise;

if (cluster.isMaster) {

  for (let i = 0; i < conf.workers; i++)
    cluster.fork();

  cluster.on('exit', function (worker) {
    if (!worker.exitedAfterDisconnect)
      cluster.fork();
  });

  require('./system/setup').master(function (err) {
    if (err) trace(err);
  });

} else {

  require('./app').run();

}
