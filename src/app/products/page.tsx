import { Product } from "@/entities/products/model/types";
import { ProductList } from "@/widgets/ProductList/ui/ProductList";

type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export default async function ProductsPage() {
  const response = await fetch("https://dummyjson.com/products");
  const data: ProductsResponse = await response.json();
  console.log(data);

  return (
    <main>
      <ProductList products={data.products} />
    </main>
  );
}
