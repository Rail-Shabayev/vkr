import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { finalize } from 'rxjs';
import { Cart, CartItem } from 'src/app/interface/cart';
import { User } from 'src/app/interface/user';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private _cart: Cart = { items: [], id: 0 };
  itemsQuantity = 0;
  private _user: User = {
    id: 0,
    city: '',
    email: '',
    fullname: '',
    password: '',
    phoneNumber: '',
    role: ' ',
    username: ' ',
  };
  @Input()
  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private login: LoginService,
    private router: Router
  ) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  logout() {
    this.http
      .post('http://localhost:8080/logout', {})
      .pipe(
        finalize(() => {
          this.login.authenticated = false;
          this.router.navigateByUrl('/login');
        })
      )
      .subscribe();
  }
  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51N79ZQCO37AiN0jQXPhEizxNr72T7RUbg3PpFNYuG6klMOvoZlCsTW2fKMyD06OSy8cr613iwQBE0QKjNk06tOvd00JRKKhJmF'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
        setTimeout(() => {
          this.onClearCart();
        }, 200);
      });
  }
}
