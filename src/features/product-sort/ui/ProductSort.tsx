"use client";

import { SortParams } from "@/entities/product/model/types";
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

    const [sortBy, order] = selectedValue.split("-") as [NonNullable<SortParams["sortBy"]>, NonNullable<SortParams["order"]>];

    onSortChange({ sortBy, order });
  };

  return (
    <div className={styles.sort}>
      <label className={styles.label} htmlFor='product-sort'>
        Сортировка
      </label>

      <select className={styles.select} id='product-sort' value={value} onChange={handleChange}>
        <option value='default'>По умолчанию</option>
        <option value='title-asc'>По названию: А–Я</option>
        <option value='price-asc'>Сначала дешевле</option>
        <option value='price-desc'>Сначала дороже</option>
      </select>
    </div>
  );
};
