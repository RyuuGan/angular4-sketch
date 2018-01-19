'use strict';

const express = require('express')
  , conf = require('../../conf');

let router = require('../index');

if (process.env.SERVE_STATIC) {

  router.all(/^(?!\/(api|public|i18n)).*$/, function (req, res, next) {
    req.url = '/';
    next();
  });

  router.use(express.static(conf.path('../client/dist')));

}
