class Conf {
  production = false;
  test = false;
  locales: string[] = ['ru'];
  readonly apiHost = process.env.apiHost;
  readonly host = process.env.host;
  readonly secured = process.env.secured;

  get apiOrigin() {
    return this.secured ? 'https://' + this.apiHost : 'http://' + this.apiHost;
  }

  get origin() {
    return this.secured ? 'https://' + this.host : 'http://' + this.host;
  }

}

export default new Conf();
