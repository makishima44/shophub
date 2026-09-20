"use client";
import { ProductCard } from "@/entities/product/ui/ProductCard/ProductCard";
import styles from "./ProductList.module.css";
import { useGetProductsQuery } from "@/entities/product/api/productsApi";

export const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className={styles.productsGrid}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
