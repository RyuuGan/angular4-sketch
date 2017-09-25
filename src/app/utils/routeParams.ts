import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

export class RouteParamsHelper {

  static getParam(route: ActivatedRouteSnapshot, name: string) {
    let _route = route;
    while (_route) {
      if (_route.params[name]) {
        return _route.params[name];
      }
      _route = _route.parent;
    }

    return '';

  }

  static getData(route: ActivatedRoute, name: string) {
    let _route = route;

    while (_route) {
      if (_route.snapshot.data[name]) {
        return _route.snapshot.data[name];
      }
      _route = _route.parent;
    }

    return null;

  }

  static getDataSnapshot(route: ActivatedRouteSnapshot, name: string) {
    let _route = route;

    while (_route) {
      if (_route.data[name]) {
        return _route.data[name];
      }
      _route = _route.parent;
    }

    return null;

  }

}
