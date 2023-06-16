// https://www.youtube.com/watch?v=Kbauf9IgsC4
// https://www.youtube.com/watch?v=hHzbrbm0X9g
// https://youtu.be/Dv6R0Yi-pnM
// https://www.youtube.com/watch?v=_TVrn-pyTo8&t=109s
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/product';
import { CartService } from '../service/cart.service';
import { Cart } from '../interface/cart';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 6;
  totalProducts: any;
  category: string | undefined;
  product: Product | undefined;
  searchText: string = '';
  cols = 3;
  fullWidthMode = false;
  public products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    const cart: Cart = { items: [], id: 0 };
    cartService.saveCart(cart);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onShowNewCategory(newCategory: string): void {
    this.category = newCategory;
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productService.loadProducts().subscribe(
      (response: Product[]) => {
        if (this.category) {
          this.products = response.filter((p) => p.type === this.category);
          this.totalProducts = this.products.length;
        } else if (this.searchText) {
          this.products = response.filter((p) =>
            p.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          this.totalProducts = this.products.length;
        } else {
          this.products = response;
          this.totalProducts = this.products.length;
        }
        this.p = 1;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
    this.fullWidthMode = colsNum === 1 ? true : false;
    this.itemsPerPage = this.fullWidthMode ? 3 : 6;
    this.p = 1;
  }
}
