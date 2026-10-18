"use client";

import { ProductSearch } from "@/features/product-search";
import { ProductSort } from "@/features/product-sort";
import { SortParams } from "@/entities/product/model/types";
import styles from "./ProductToolbar.module.css";

type ProductToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchBlur: () => void;
  sortBy?: SortParams["sortBy"];
  order?: SortParams["order"];
  hasInvalidSort?: boolean;
  onSortChange: (sort: SortParams) => void;
  onReset: () => void;
};

export const ProductToolbar = ({ search, onSearchChange, onSearchBlur, sortBy, order, hasInvalidSort = false, onSortChange, onReset }: ProductToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.search}>
        <ProductSearch value={search} onChange={onSearchChange} onBlur={onSearchBlur} />
      </div>

      <div className={styles.controls}>
        <ProductSort sortBy={sortBy} order={order} onSortChange={onSortChange} />

        <button className={styles.resetButton} type='button' onClick={onReset} disabled={!search && !sortBy && !order && !hasInvalidSort}>
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};
