'use strict';

const mongoose = require('mongoose')
  , utils = require('../utils');

/**
 * @module Types
 */

let User = mongoose.Schema({

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /.+@.+\..+/
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  secondName: {
    type: String,
    trim: true,
    default: ''
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  active: {
    type: Boolean,
    default: true
  },

  lastLoginAt: Date

});

User.plugin(require('./plugins/paginate'));
User.plugin(require('./plugins/extend'));

/**
 * @memberOf module:Types
 *
 * @typedef {Object} UserClient
 *
 * @description Client version of user
 *
 * @property {ObjectId} _id - unique identifier. Read only.
 * @property {string} email - email
 * @property {string} firstName - first name
 * @property {string} secondName - second name (patronymic)
 * @property {string} lastName - last name
 *
 * @property {Date} createdAt - date when user was created
 *
 * @property {string} avatar - link to user avatar. Read only.
 * @property {string} title - composed title of the user. Read only.
 *
 */
User.virtual('client').get(function () {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    secondName: this.secondName,
    lastName: this.lastName,

    createdAt: this.createdAt,

    avatar: this.avatar,
    title: this.title
  };
});

User.virtual('avatar').get(function () {
  return '//gravatar.com/avatar/' + utils.md5(this.email) + '?d=mm';
});

User.virtual('title').get(function () {
  return [this.lastName, this.firstName, this.secondName].join(' ');
});

User.methods.setPassword = async function (password) {
  this.password = await utils.bcrypt(password);
};

User.methods.checkPassword = async function (password) {
  return await utils.bcryptCompare(password, this.password);
};

User.index({ email: 1 }, { unique: true });

module.exports = exports = mongoose.model('User', User);

exports.titleFields = 'email firstName secondName lastName';
