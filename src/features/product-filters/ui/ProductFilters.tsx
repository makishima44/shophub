"use client";

import { useGetProductCategoriesQuery } from "@/entities/product/api/productsApi";
import { Select, type SelectOption } from "@/shared/ui/Select";
import styles from "./ProductFilters.module.css";

type ProductFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export const ProductFilters = ({ selectedCategory, onCategoryChange }: ProductFiltersProps) => {
  const { data: categories, isLoading, isError } = useGetProductCategoriesQuery();
  const hasSelectedCategory = categories?.some((category) => category.slug === selectedCategory) ?? false;
  const categoryOptions: SelectOption[] = [
    { value: "", label: "All products" },
    ...(selectedCategory && !hasSelectedCategory
      ? [{ value: selectedCategory, label: isLoading ? "Loading selected category…" : selectedCategory }]
      : []),
    ...(categories ?? []).map((category) => ({ value: category.slug, label: category.name })),
  ];

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
        <Select
          id='product-category'
          className={styles.categorySelect}
          value={selectedCategory}
          options={categoryOptions}
          disabled={isLoading || isError}
          onValueChange={onCategoryChange}
        />
        {isLoading && <span className={styles.mobileStatus}>Loading categories…</span>}
        {isError && <span className={styles.mobileStatus}>Failed to load categories</span>}
      </div>
    </div>
  );
};
