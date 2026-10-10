"use client";

import { useEffect, useState } from "react";

import { ProductCard, useGetProductsByCategoryQuery, useGetProductsBySearchQuery, useGetProductsQuery } from "@/entities/product";

import { Pagination } from "./Pagination";
import styles from "./ProductList.module.css";

type ProductListProps = {
  search: string;
  category: string;
};

export const ProductList = ({ search, category }: ProductListProps) => {
  const [page, setPage] = useState(1);

  const limit = 10;
  const skip = (page - 1) * limit;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    error: productsError,
  } = useGetProductsQuery({ limit, skip }, { skip: search !== "" || category !== "" });

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    error: searchError,
  } = useGetProductsBySearchQuery({ search, limit, skip }, { skip: search === "" });

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
    error: categoryError,
  } = useGetProductsByCategoryQuery({ category, limit, skip }, { skip: category === "" || search !== "" });

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const productsToRender = search ? searchData?.products : category ? categoryData?.products : productsData?.products;
  const total = search ? (searchData?.total ?? 0) : category ? (categoryData?.total ?? 0) : (productsData?.total ?? 0);
  const totalPages = Math.ceil(total / limit);

  const isLoading = search ? isSearchLoading || isSearchFetching : category ? isCategoryLoading || isCategoryFetching : isProductsLoading || isProductsFetching;
  const error = search ? searchError : category ? categoryError : productsError;

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
