import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  // Generic method to perform HTTP GET request
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  // Generic method to perform HTTP POST request
  post<T>(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  // Generic method to perform HTTP PUT request
  put<T>(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

  // Generic method to perform HTTP DELETE request
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
