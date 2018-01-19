'use strict';

const express = require('express')
  , conf = require('../conf');

const router = module.exports = new express.Router();

if (process.env.SERVE_STATIC) {

  router.all(/^(?!\/(api|public|i18n)).*$/, function (req, res, next) {
    req.url = '/';
    next();
  });

  router.use(express.static(conf.path('../client/dist')));

}

router.use(require('body-parser').json());

router.use(require('./middleware/responseExt'));
router.use(require('./api/scim'));
