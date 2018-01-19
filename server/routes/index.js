'use strict';

const express = require('express');

const router = module.exports = new express.Router();

require('./static');

router.use(require('body-parser').json());

router.use(require('./middleware/responseExt'));
router.use(require('./api/scim'));
