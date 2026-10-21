"use client";

import { useGetProductCategoriesQuery } from "@/entities/product/api/productsApi";
import styles from "./ProductFilters.module.css";

type ProductFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export const ProductFilters = ({ selectedCategory, onCategoryChange }: ProductFiltersProps) => {
  const { data: categories, isLoading, isError } = useGetProductCategoriesQuery();

  return (
    <div className={styles.filterContainer}>
      <aside className={styles.sidebar} aria-label='Product categories' aria-busy={isLoading}>
        {isLoading ? (
          <>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} aria-hidden='true' />
            <ul className={styles.categoryList} aria-hidden='true'>
              {Array.from({ length: 10 }, (_, index) => (
                <li key={index}>
                  <div className={`${styles.skeleton} ${styles.skeletonCategory}`} />
                </li>
              ))}
            </ul>
          </>
        ) : isError ? (
          <p className={styles.state}>Failed to load categories</p>
        ) : (
          <>
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
          </>
        )}
      </aside>

      <div className={styles.mobileFilter}>
        <label className={styles.mobileLabel} htmlFor='product-category'>Category</label>
        <select
          id='product-category'
          className={styles.categorySelect}
          value={selectedCategory}
          disabled={isLoading || isError}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value=''>All products</option>
          {selectedCategory && !categories?.some((category) => category.slug === selectedCategory) && (
            <option value={selectedCategory}>{isLoading ? "Loading selected category…" : selectedCategory}</option>
          )}
          {categories?.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        {isLoading && <span className={styles.mobileStatus}>Loading categories…</span>}
        {isError && <span className={styles.mobileStatus}>Failed to load categories</span>}
      </div>
    </div>
  );
};
