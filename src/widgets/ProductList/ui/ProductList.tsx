"use client";

import { useState } from "react";

import { ProductCard, useGetProductsByCategoryQuery, useGetProductsBySearchQuery, useGetProductsQuery } from "@/entities/product";

import { Pagination } from "./Pagination";
import styles from "./ProductList.module.css";

type ProductListProps = {
  search: string;
  category: string;
};

export const ProductList = ({ search, category }: ProductListProps) => (
  <ProductListContent key={`${search}:${category}`} search={search} category={category} />
);

const ProductListContent = ({ search, category }: ProductListProps) => {
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

  const productsToRender = search ? searchData?.products : category ? categoryData?.products : productsData?.products;
  const total = search ? (searchData?.total ?? 0) : category ? (categoryData?.total ?? 0) : (productsData?.total ?? 0);
  const totalPages = Math.ceil(total / limit);

  const isLoading = search ? isSearchLoading : category ? isCategoryLoading : isProductsLoading;
  const isFetching = search ? isSearchFetching : category ? isCategoryFetching : isProductsFetching;
  const error = search ? searchError : category ? categoryError : productsError;
  const isInitialLoading = isLoading && !productsToRender;

  const handlePageChange = (nextPage: number) => {
    if (isFetching || nextPage === page) {
      return;
    }

    setPage(nextPage);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  if (isInitialLoading) {
    return (
      <div className={styles.productsGrid} aria-label='Loading products' aria-busy='true'>
        {Array.from({ length: limit }, (_, index) => (
          <div className={styles.skeletonCard} key={index} aria-hidden='true'>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonLine} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
              <div className={styles.skeletonFooter} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className={styles.state}>Failed to load products.</div>;
  }

  if (!productsToRender || productsToRender.length === 0) {
    return <div className={styles.state}>Products not found.</div>;
  }

  return (
    <div>
      <div className={`${styles.productsGrid} ${isFetching ? styles.isFetching : ""}`} aria-busy={isFetching}>
        {productsToRender.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {isFetching && <div className={styles.loadingIndicator}>Loading products...</div>}
      </div>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} isLoading={isFetching} onPageChange={handlePageChange} />}
    </div>
  );
};
