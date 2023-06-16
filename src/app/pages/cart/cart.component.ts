import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/interface/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], id: 0 };
  dataSource: CartItem[] = [];

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  public loadCart(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    let authentication: any;
    if(authentication) {
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
          setTimeout( () => {
            this.onClearCart();
          }, 200);
        });
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
