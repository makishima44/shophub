import { ProductList } from "@/widgets/ProductList/ui/ProductList";
import { ProductFilters } from "@/features/product-filters";
import { ProductSort } from "@/features/product-sort/ui/ProductSort";
import { SortParams } from "@/entities/product/model/types";
import styles from "./ProductCatalog.module.css";

type ProductCatalogProps = {
  search: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy?: SortParams["sortBy"];
  order?: SortParams["order"];
};

export const ProductCatalog = ({ search, selectedCategory, onCategoryChange, sortBy, order }: ProductCatalogProps) => {
  return (
    <div className={styles.catalog}>
      <ProductFilters selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />

      <div className={styles.products}>
        <ProductList search={search} category={selectedCategory} sortBy={sortBy} order={order} />
      </div>
    </div>
  );
};
