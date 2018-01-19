'use strict';

const path = require('path');

class Conf {

  constructor() {
    this.root = process.cwd();

    this.smtp = {
      host: '',
      port: '465',
      secure: true,
      auth: {
        user: '',
        pass: ''
      }
    };

    this.JWT = {
      secret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDM5OTA4NzksImV4cCI6MTUzNTUyNjg3OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.I4kYsJaTltq-c-bwkEh5CO_Cc9gEGJOzqWkCDJEuqXcto9Qn0ce7Bvh9E5fRClkH_ZGpAnXpcfGu5KZ9tlODTA',
      algorithm: 'HS512'
    };
  }

  get ip() {
    return process.env.IP || '127.0.0.1';
  }

  get port() {
    return process.env.PORT || 3001;
  }

  get host() {
    return process.env.HOST || '127.0.0.1:3001';
  }

  get clientHost() {
    return process.env.CLIENT_HOST || '127.0.0.1:3000'
  }

  get secured() {
    return process.env.SECURED === 'true';
  }

  get workers() {
    return 1;
  }

  get origin() {
    return '//' + this.host;
  }

  get clientOrigin() {
    return this.protocol + '://' + this.clientHost;
  }

  get protocol() {
    return this.secured ? 'https' : 'http';
  }

  get mongoUrl() {
    return process.env.MONGODB_URI || 'mongodb://127.0.0.1/yourDbHere';
  }

  path(relPath) {
    return path.join(this.root, relPath);
  }

}

module.exports = new Conf();
