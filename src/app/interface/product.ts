export interface Product {
  id: number;
  name: string;
  descr: string;
  price: number;
  quantity: number;
  placedAt: Date;
  isFavorite: boolean;
  imageUrl: string;
  type: string;
}
