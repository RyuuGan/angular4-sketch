'use strict';

const mongoose = require('mongoose');

module.exports = exports = function (schema) {

  schema.statics.paginate = function (options) {
    let self = this;
    options = options || {};
    let criteria = options.criteria || {};
    let page = Math.max(options.page, 0) || 0;
    let limit = Math.min(options.limit, 100) || 50;
    let sort = options.sort || {};
    return {
      exec: function (cb) {
        let collection = self.collection;
        let query = new mongoose.Query();
        criteria = query.cast(self, criteria);
        let cursor = collection.find(criteria)
          .limit(limit)
          .skip(page * limit)
          .sort(sort);
        if (options.select)
          cursor.project(options.select);

        // mongoose cursor
        let q = self.find(criteria)
          .limit(limit)
          .sort(sort)
          .skip(page * limit);

        if (options.populate) {
          q.populate(options.populate);
        }

        if (options.select)
          q.select(options.select);

        cursor.count(false, function (err, count) {
          if (err) return cb(err);
          let items = [];
          let stream = q.cursor();
          stream.on('data', function (doc) {
            items.push(doc.client);
          });
          stream.on('end', function () {
            cursor.close();
            cb(null, {
              items: items,
              count: count,
              page: page,
              pages: Math.ceil(count / limit),
              limit: limit
            });
          });
        });
      }
    };
  };

};
