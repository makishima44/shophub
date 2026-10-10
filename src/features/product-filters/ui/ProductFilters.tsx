"use client";
import { useGetProductCategoriesQuery } from "@/entities/product/api/productsApi";
import styles from "./ProductFilters.module.css";

type ProductFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export const ProductFilters = ({ selectedCategory, onCategoryChange }: ProductFiltersProps) => {
  const { data: categories, isLoading, isError } = useGetProductCategoriesQuery();

  if (isLoading) {
    return (
      <aside className={styles.sidebar}>
        <p className={styles.state}>Loading categories...</p>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className={styles.sidebar}>
        <p className={styles.state}>Failed to load categories</p>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>

      <ul className={styles.categoryList}>
        <li>
          <button className={`${styles.categoryButton} ${selectedCategory === "" ? styles.active : ""}`} onClick={() => onCategoryChange("")}>
            All products
          </button>
        </li>

        {categories?.map((category) => (
          <li key={category.slug}>
            <button
              className={`${styles.categoryButton} ${selectedCategory === category.slug ? styles.active : ""}`}
              onClick={() => onCategoryChange(category.slug)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
