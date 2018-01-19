'use strict';

const express = require('express');

module.exports = new express.Router();

/**
 * @module SCIM/V1
 *
 * @description
 * Base href is `/api/scim/v1`
 */

require('./login');

// Auth associated routes

require('./principal');
