import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';


  constructor(private loginService: LoginService, private router: Router) {}

  doLogin() {
    this.loginService.doLogin(this.username, this.password);
  }
}
