import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api/';

  constructor(private http: HttpClient) {}

  // ✅ COMMON AUTH HEADER
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: token
    });
  }

  // ✅ GET
  getMethod(endpoint: string, headers: HttpHeaders = this.getAuthHeaders()) {
    return this.http.get(this.baseUrl + endpoint, {
      headers
    });
  }

  // ✅ POST
  postMethod(endpoint: string, payload: any, headers: HttpHeaders = this.getAuthHeaders()) {
    return this.http.post(this.baseUrl + endpoint, payload, {
      headers
    });
  }

  // ✅ PUT
  putMethod(endpoint: string, payload: any, headers: HttpHeaders = this.getAuthHeaders()) {
    return this.http.put(this.baseUrl + endpoint, payload, {
      headers
    });
  }

  // ✅ DELETE
  deleteMethod(endpoint: string, headers: HttpHeaders = this.getAuthHeaders()) {
    return this.http.delete(this.baseUrl + endpoint, {
      headers
    });
  }
}