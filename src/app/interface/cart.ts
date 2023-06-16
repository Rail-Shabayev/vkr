export interface Cart {
  id: number;
  items: Array<CartItem>;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
