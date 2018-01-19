class Conf {
  production = false;
  test = false;
  locales: string[] = ['ru'];
  apiHost = '127.0.0.1:3001';
  host = '127.0.0.1:3000';
  secured = false;

  get apiOrigin() {
    return this.secured ? 'https://' + this.apiHost : 'http://' + this.apiHost;
  }

  get origin() {
    return this.secured ? 'https://' + this.host : 'http://' + this.host;
  }

}

export default new Conf();
