'use strict';

const crypto = require('crypto')
  , mongoose = require('mongoose')
  , conf = require('./conf')
  , bcrypt = require('bcrypt')
  , JWT = require('jsonwebtoken')
  , sprintf = require('sprintf');

exports.sprintf = sprintf;

exports.sha256 = (str) => {
  let p = crypto.createHash('sha256');
  p.update(str, 'utf-8');
  return p.digest('hex');
};

exports.sha512 = (str) => {
  let p = crypto.createHash('sha512');
  p.update(str, 'utf-8');
  return p.digest('hex');
};

exports.md5 = (str) => {
  let p = crypto.createHash('md5');
  p.update(str, 'utf-8');
  return p.digest('hex');
};

exports.searchRegex = (q, unbound) => {
  let expr = q.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  if (!unbound)
    expr = '^' + expr;
  return new RegExp(expr, 'i');
};

exports.id = (obj) => {
  return obj && (obj._id ? obj.id : obj.toString());
};

exports.ids = (objs) => {
  return objs.map(function (obj) {
    return exports.id(obj);
  });
};

exports.eq = (obj, another) => {
  return exports.id(obj) === exports.id(another);
};

exports.objectId = (obj) => {
  let str = exports.id(obj);
  return /^[a-fA-F0-9]{24}$/.test(obj) ? new mongoose.Types.ObjectId(str) : null;
};

exports.objectIds = (objs) => {
  return objs.reduce(function (results, obj) {
    try {
      let objectId = exports.objectId(obj);
      if (objectId)
        results.push(objectId);
    } catch (e) {
    }
    return results;
  }, []);
};

exports.randomString = (length) => {
  let CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++)
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  return result;
};

exports.jwtSign = (object, cb) => {
  JWT.sign(object, conf.JWT.secret, {
    algorithm: conf.JWT.algorithm
  }, cb);
};

exports.jwtVerify = (str, cb) => {
  JWT.verify(str, conf.JWT.secret, {
    algorithms: [conf.JWT.algorithm]
  }, cb);
};

exports.bcrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.bcryptCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
