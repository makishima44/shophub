import { Product, ProductsResponse } from "../model/types";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products");
  const data: ProductsResponse = await response.json();

  return data.products;
}
