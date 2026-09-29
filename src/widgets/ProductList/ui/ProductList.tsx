"use client";

import { ProductCard, useGetProductsQuery } from "@/entities/product";
import styles from "./ProductList.module.css";

export const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.state}>Failed to load product</div>;
  }

  if (!products) {
    return <div className={styles.state}>Product not found</div>;
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
