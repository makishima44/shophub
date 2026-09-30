"use client";

import { ProductCard, useGetProductsBySearchQuery, useGetProductsQuery } from "@/entities/product";
import styles from "./ProductList.module.css";

type ProductListProps = {
  search: string;
};

export const ProductList = ({ search }: ProductListProps) => {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined, { skip: search !== "" });
  const { data: searchProducts } = useGetProductsBySearchQuery(search, { skip: search === "" });

  const productsToRender = search ? searchProducts : products;

  if (isLoading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.state}>Failed to load product</div>;
  }

  if (!productsToRender) {
    return <div className={styles.state}>Product not found</div>;
  }

  return (
    <div className={styles.productsGrid}>
      {productsToRender.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
