class Conf {
  production = false;
  test = false;
  locales: string[] = ['ru'];
  apiHost = '127.0.0.1:7777';
  host = '127.0.0.1:3000';
  secured = false;
  keepAliveInterval = 4 * 60;
  walletKinds = ['eth', 'btc', 'ltc', 'dash', 'doge'];

  maxWallets: 2;

  wallets = {
    eth: {
      min: 0.1,
      max: 500,
      fee: 0.01
    },
    btc: {
      min: 0.01,
      max: 350,
      fee: 0.001
    },
    ltc: {
      min: 0.5,
      max: 550,
      fee: 0.01
    },
    dash: {
      min: 0.1,
      max: 500,
      fee: 0.01
    },
    doge: {
      min: 300,
      max: 5000000,
      fee: 1
    }
  };

  getWalletConf(kind: any) {
    return this.wallets[kind];
  }

  get apiOrigin() {
    return this.secured ? 'https://' + this.apiHost : 'http://' + this.apiHost;
  }

  get origin() {
    return this.secured ? 'https://' + this.host : 'http://' + this.host;
  }

  get networkType() {
    return this.production ? 'prod' : 'testnet';
  }
}

export default new Conf();
