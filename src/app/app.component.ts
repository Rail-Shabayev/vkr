import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from './service/cart.service';
import { Cart } from './interface/cart';
import { Subscription } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cart: Cart = { id: 0, items: [] };
  user = {
    id: 0,
    city: '',
    email: '',
    fullname: '',
    password: '',
    phoneNumber: '',
    role: ' ',
    username: ' ',
  };

  constructor(private cartService: CartService, private login: LoginService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadUser(): void {
    this.login.user.subscribe((_user) => {
      this.user = _user;
    });
  }
  loadCart(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
