"use client";

import { SortParams } from "@/entities/product/model/types";
import { productSortOptions } from "../model/sortOptions";
import styles from "./ProductSort.module.css";

type ProductSortProps = SortParams & {
  onSortChange: (sort: SortParams) => void;
};

export const ProductSort = ({ sortBy, order, onSortChange }: ProductSortProps) => {
  const value = sortBy && order ? `${sortBy}-${order}` : "default";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "default") {
      onSortChange({});
      return;
    }

    const selectedOption = productSortOptions.find((option) => option.value === selectedValue);
    if (!selectedOption) return;

    onSortChange({ sortBy: selectedOption.sortBy, order: selectedOption.order });
  };

  return (
    <div className={styles.sort}>
      <label className={styles.label} htmlFor='product-sort'>
        Сортировка
      </label>

      <select className={styles.select} id='product-sort' value={value} onChange={handleChange}>
        <option value='default'>По умолчанию</option>
        {productSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
