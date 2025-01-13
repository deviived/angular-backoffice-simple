import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay } from 'rxjs/operators';

export interface User {
    email: string;
    first_name: string;
    last_name: string;
} 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user: Partial<User> = {};

  login(email: string, password: string) {
    return this.http
      .post<User>('/api/login', { email, password })
      .pipe(shareReplay())
      .subscribe((value) => (this.user = value));
    // this is just the HTTP call,
    // we still need to handle the reception of the token
  }
}
