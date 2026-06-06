export interface Product {
  id: string;
  type: string;
  title: string;
  description: string;
  price: string;
  picture: string;
}

export interface FirebaseProducts {
  [id: string]: Omit<Product, "id">;
}