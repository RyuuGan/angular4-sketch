'use strict';

const conf = require('../conf')
  , systemUsers = require('./users')
  , User = require('../model/user')
  , mongoose = require('mongoose')
  , log = require('debug')('app:log')
  , async = require('async');

const users = Object.keys(systemUsers).map(function (k) {
  return systemUsers[k];
});

module.exports.master = function (cb) {
  connectToMongo(function () {
    async.series([
      createSystemUsers
    ], cb);
  });
};

function connectToMongo(cb) {
  mongoose.Promise = Promise;
  mongoose.connect(conf.mongoUrl, { useMongoClient: true }, function (err) {
    if (err) {
      log('Failed connection to mongo. Reason:');
      log(err.message);
      log('Trying reconnect in 1 sec');
      setTimeout(function () {
        connectToMongo(cb);
      }, 1000);
      return;
    }
    cb();
  });
}

function createSystemUsers(cb) {
  async.each(users, createSystemUser, cb);
}

function createSystemUser(user, cb) {
  User.findOne({
    _id: user._id
  }).exec(function (ignoredErr, exists) {
    if (exists) return cb();
    log('Create System User: %s', user.lastName);
    new User(user).save(cb);
  });
}
