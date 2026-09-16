import { getProducts } from "@/entities/product/api/getProducts";
import { ProductList } from "@/widgets/ProductList/ui/ProductList";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <ProductList products={products} />
    </main>
  );
}
