"use client";

import { useEffect, useState } from "react";

import { ProductCard, useGetProductsBySearchQuery, useGetProductsQuery } from "@/entities/product";

import { Pagination } from "./Pagination";
import styles from "./ProductList.module.css";

type ProductListProps = {
  search: string;
};

export const ProductList = ({ search }: ProductListProps) => {
  const [page, setPage] = useState(1);

  const limit = 10;
  const skip = (page - 1) * limit;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    error: productsError,
  } = useGetProductsQuery({ limit, skip }, { skip: search !== "" });

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    error: searchError,
  } = useGetProductsBySearchQuery({ search, limit, skip }, { skip: search === "" });

  useEffect(() => {
    setPage(1);
  }, [search]);

  const productsToRender = search ? searchData?.products : productsData?.products;
  const total = search ? (searchData?.total ?? 0) : (productsData?.total ?? 0);
  const totalPages = Math.ceil(total / limit);

  const isLoading = search ? isSearchLoading || isSearchFetching : isProductsLoading || isProductsFetching;
  const error = search ? searchError : productsError;

  if (isLoading) {
    return <div className={styles.state}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.state}>Failed to load products.</div>;
  }

  if (!productsToRender || productsToRender.length === 0) {
    return <div className={styles.state}>Products not found.</div>;
  }

  return (
    <div>
      <div className={styles.productsGrid}>
        {productsToRender.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
};
