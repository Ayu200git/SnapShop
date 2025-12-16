export interface ProductRating {
  rate?: number;
  count?: number;
}

export interface Product {
  _id?: string;
  id?: string | number; // Support both MongoDB _id and legacy number id
  title: string;
  price: number;
  category: string;
  image: string;
  imageUrl?: string;
  description?: string;
  rating?: {
    rate: number;
    count: number;
  };
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}
 export interface getNewProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
 }

 export interface getProductById {
  id: number,
 }

 export interface updateProduct {
  id: number,
  title:string,
  price: number,
  description: string,
  category:string,
  image: string,
 }
  
export interface deleteProduct{
  id: number,
} 

