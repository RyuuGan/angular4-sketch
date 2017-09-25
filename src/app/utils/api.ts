'use strict';

import conf from '../conf';

// import AuthService from '../services/scim.service';

/**
 * Helper for construction api URLs
 */
class ApiHelper {
  static version = 'v1';
  static secured: boolean = conf.secured;

  static makeUrl(endpoint: string, prefix = ''): string {
    const _endpoint = endpoint.replace(/^\//, '');
    const _prefix = prefix ? prefix.replace(/^\//, '') + '/' : '';
    return conf.apiOrigin + '/api/' + _prefix + ApiHelper.version + '/' + _endpoint;
  }

  static my(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'my');
  }

  static storage(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'storage');
  }

  static scim(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'scim');
  }

  static wallets(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'wallets');
  }

  static wallet(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'wallet');
  }

  static transactions(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'transactions');
  }

  static transaction(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'transaction');
  }

  static user(endpoint: string): string {
    return ApiHelper.makeUrl(endpoint, 'user');
  }

  /*
  static get (url: string): Promise<any> {
    return ApiHelper.request('GET', url);
  }

  static post(url: string, data: Object): Promise<any> {
    return ApiHelper.request('POST', url, data);
  }

  static delete(url: string): Promise<any> {
    return ApiHelper.request('DELETE', url);
  }


  static request(method: string, url: string, data?: any): Promise<any> {
    const authHeaders = AuthService.getAuthHeader();
    let config: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      }
    };

    if (data && method.toUpperCase() == 'POST') {
      config.body = JSON.stringify(data);
    }

    return fetch(url, config)
      .then(response =>
        response.json().then(data => ({data, response}))
      )
      .then(({data, response}) => {
        ApiHelper.processError(data, response);
        return data.results;
      });
  }

  static processError(data: any, response: Response) {

  }
  */

}

export default ApiHelper;
