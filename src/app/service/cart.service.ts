import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of, switchMap } from 'rxjs';
import { Cart, CartItem } from '../interface/cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiServerUrl = 'http://localhost:8080';
  cart = new BehaviorSubject<Cart>({ items: [], id: 0 });

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
    this.loadCart2();
  }

  public loadCart2(): void {
    this.loadCart().subscribe((_cart: Cart[]) => {
      this.cart.next(_cart[0]);
    });
  }

  public loadCart(): Observable<Array<Cart>> {
    return this.http.get<Array<Cart>>(`${this.apiServerUrl}/cart`);
  }

  public saveCart(cart: Cart) {
    return this.http.post<Cart>(`${this.apiServerUrl}/cart`, cart);
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({
      items,
      id: this.cart.value.id,
    });
    this.saveCart(this.cart.value).subscribe();
    this._snackBar.open('Продукт добавлен в корзину', 'Oк', {
      duration: 3000,
    });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() {
    this.cart.next({
      items: [],
      id: this.cart.value.id,
    });
    this.saveCart(this.cart.value).subscribe();
    this._snackBar.open('Корзина очищена', 'Oк', { duration: 3000 });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({
        items: filteredItems,
        id: this.cart.value.id,
      });
      this.saveCart(this.cart.value).subscribe();
      this._snackBar.open('Товар убран из корзины', 'Oк', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({
      items: filteredItems,
      id: this.cart.value.id,
    });
    this.saveCart(this.cart.value).subscribe();
    this._snackBar.open('Товар убран из корзины', 'Oк', {
      duration: 3000,
    });
  }
}
