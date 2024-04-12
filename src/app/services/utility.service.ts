import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  getQueryParams(body: any): HttpParams {
    let params = new HttpParams();
    return this.buildParams(params, '', body);
  }

  private buildParams(params: HttpParams, prefix: string, obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        if (typeof value === 'object' && value !== null) {
          this.buildParams(params, prefix ? `${prefix}.${key}` : key, value);
        } else {
          params = params.append(
            prefix ? `${prefix}.${key}` : key,
            encodeURIComponent(value)
          );
        }
      }
    }
    return params;
  }
}
