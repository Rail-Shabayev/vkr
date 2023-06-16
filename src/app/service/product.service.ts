import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interface/product";

@Injectable({
  providedIn:'root'
})
export class ProductService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/home`);
  }
}
