'use strict';

module.exports = exports = function (schema) {

  schema.methods.extend = function (obj, filterFields) {
    let self = this
      , useFilter = typeof filterFields === 'object';

    Object.keys(obj).forEach(function (key) {
      if (key.indexOf('_') !== 0) {
        if (!useFilter) {
          self[key] = obj[key];
        } else if (typeof filterFields[key] !== 'undefined' && filterFields[key] !== '') {
          self[key] = obj[key];
        }
      }
    });
    return self;
  };

};
