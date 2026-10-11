import { ProductList } from "@/widgets/ProductList/ui/ProductList";
import { ProductFilters } from "@/features/product-filters";
import styles from "./ProductCatalog.module.css";

type ProductCatalogProps = {
  search: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export const ProductCatalog = ({ search, selectedCategory, onCategoryChange }: ProductCatalogProps) => {
  return (
    <div className={styles.catalog}>
      <ProductFilters selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />

      <div className={styles.products}>
        <ProductList search={search} category={selectedCategory} />
      </div>
    </div>
  );
};
