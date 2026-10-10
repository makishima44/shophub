"use client";

import { useState } from "react";
import { ProductList } from "@/widgets/ProductList/ui/ProductList";

import styles from "./ProductCatalog.module.css";
import { ProductFilters } from "@/features/product-filters";

type ProductCatalogProps = {
  search: string;
};

export const ProductCatalog = ({ search }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className={styles.catalog}>
      <ProductFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <div className={styles.products}>
        <ProductList search={search} category={selectedCategory} />
      </div>
    </div>
  );
};
