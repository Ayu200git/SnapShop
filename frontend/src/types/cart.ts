import type { Product } from "./product";

export interface CartItem {
  id: Product["id"] | string;
  title: Product["title"];
  price: Product["price"];
  image: Product["image"];
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}


