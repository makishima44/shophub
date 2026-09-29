import { ProductSearch } from "@/features/product-search";
import { ProductList } from "@/widgets/ProductList";

export default async function ProductsPage() {
  return (
    <main>
      <ProductSearch />
      <ProductList />
    </main>
  );
}
