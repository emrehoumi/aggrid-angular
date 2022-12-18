import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
