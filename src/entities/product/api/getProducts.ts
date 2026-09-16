import { Product } from "../model/types";

type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products");
  const data: ProductsResponse = await response.json();

  return data.products;
}
