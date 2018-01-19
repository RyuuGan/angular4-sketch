'use strict';

const $ = require('./index')
  , User = require('../../../../model/user')
  , utils = require('../../../../utils')
  , error = require('debug')('app:error');

const PREFIX = '/login';

/**
 * @memberOf module:SCIM/V1
 *
 * @function POST /login
 *
 * @description
 * Log in user.
 *
 * @param {string} email - email of the user to login
 * @param {string} password - sha256 of the user password
 *
 * @returns {Object} results - response if user logged in successfully.
 * @returns {string} results.authToken - authorization token to perform other requests
 * @returns {module:Types.UserClient} results.user - user that is logged in
 */

$.post(PREFIX, function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(async function (user) {
    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.apiFailed('USER_NOT_FOUND', 'User not found.');
    }

    // Empty password not entered
    if (user.password === '') {
      return res.apiFailed('USER_NOT_FOUND', 'User not found.');
    }

    if (!user.active) {
      return res.apiFailed('USER_DISABLED', 'User is disabled for login.');
    }

    utils.jwtSign({
      user: user.id
    }, function (err, authToken) {
      if (err) return next(err);
      return res.apiSuccess({
        authToken: authToken,
        user: user.client
      });
    });

  }).catch(next);
});
