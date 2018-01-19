'use strict';

const $ = require('./index')
  , authMiddleware = require('../../../middleware/auth');

const PREFIX = '/principal';

/**
 * @memberOf module:SCIM/V1
 *
 * @function GET /principal
 *
 * @description
 * Get logged in user.
 *
 * @returns {module:Types.UserClient} user that is logged in.
 */
$.get(PREFIX, authMiddleware, function (req, res) {
  if (req.principal) {
    return res.apiSuccess({
      user: req.principal.client
    });
  }
  return res.apiFailed('USER_NOT_FOUND', 'User not found.');
});
