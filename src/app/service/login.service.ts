import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authenticated = false;
  private apiServerUrl = 'http://localhost:8080';
  user = new BehaviorSubject<User>({
    id: 0,
    city: '',
    email: '',
    fullname: '',
    password: '',
    phoneNumber: '',
    role: ' ',
    username: ' ',
  });

  constructor(private http: HttpClient, private router: Router) {}

  doLogin(username: string, password: string) {
    let respon = this.login(username, password);
    respon.subscribe((user: User) => {

      this.user.next({
        id: user.id,
        city: user.city,
        email: user.email,
        fullname: user.fullname,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        username: user.username,
      });
      this.router.navigateByUrl('/', { skipLocationChange: true });
    });
  }

  public login(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<User>(`${this.apiServerUrl}/login/user`, {
      headers,
    });
  }
}
