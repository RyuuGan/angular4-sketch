import {
  ActivatedRouteSnapshot, DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';

export class MyRouteReuseStrategy implements RouteReuseStrategy {

  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(_route: ActivatedRouteSnapshot, _detachedTree: DetachedRouteHandle): void {
  }

  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      this.compareObjects(future.params, curr.params) &&
      this.compareObjects(future.queryParams, curr.queryParams);
  }

  private compareObjects(base: any, compare: any): boolean {

    // loop through all properties in base object
    for (let baseProperty in base) {

      // determine if comparrison object has that property, if not: return false
      if (compare.hasOwnProperty(baseProperty)) {
        switch (typeof base[baseProperty]) {
          // if one is object and other is not: return false
          // if they are both objects, recursively call this comparison function
          case 'object':
            if (typeof compare[baseProperty] !== 'object' ||
              !this.compareObjects(base[baseProperty], compare[baseProperty])) {
              return false;
            }
            break;
          // if one is function and other is not: return false
          // if both are functions, compare function.toString() results
          case 'function':
            if (typeof compare[baseProperty] !== 'function' ||
              base[baseProperty].toString() !== compare[baseProperty].toString()) {
              return false;
            }
            break;
          // otherwise, see if they are equal using coercive comparison
          default:
            // tslint:disable-next-line
            if (base[baseProperty] != compare[baseProperty]) {
              return false;
            }
        }
      } else {
        return false;
      }
    }

    // returns true only after false HAS NOT BEEN returned through all loops
    return true;
  }

}
