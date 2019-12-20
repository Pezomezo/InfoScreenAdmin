import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiRoute = '/api/user';

  constructor(private http: HttpClient) {}


  register(user: User) {
    console.log('newly registered user: ' + user.username);
    return this.http.post(this.apiRoute + '/signup', user);
}

}
