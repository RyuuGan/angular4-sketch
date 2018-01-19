'use strict';

const utils = require('../../utils')
  , User = require('../../model/user');

/**
 *
 * Authorization helper
 *
 * Gets Authorization Header from request, decodes it with JWT and adds
 * `req.principal` to request for easier finding current principal.
 *
 */
module.exports = function (req, res, next) {

  let token = req.headers.authorization;
  if (!token) {
    return next();
  }

  utils.jwtVerify(token.replace('Bearer ', ''), function (err, decoded) {
    if (err) {
      return res.apiFailed(
        'TOKEN_VALIDATION_FAILED',
        'Token supplied in authorization is not appropriate.'
      );
    }

    User.findOne({
      _id: decoded.user
    }).exec(function (err, user) {
      if (err) return next(err);
      if (!user) {
        return next();
      }

      if (!user.active) {
        return res.apiFailed('USER_DISABLED', 'User is disabled for login.')
      }

      req.principal = user;
      next();
    });
  });

};
