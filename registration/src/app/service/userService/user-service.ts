import { Injectable } from '@angular/core';
import { ApiService } from '../httpClient/http-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private api: ApiService) {}

  register(data: any) {
    return this.api.postMethod('user/userSignUp', data);
  }

  login(data: any) {
    return this.api.postMethod('user/login', data);
  }
}


