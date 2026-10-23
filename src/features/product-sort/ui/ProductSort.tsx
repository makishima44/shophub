"use client";

import { SortParams } from "@/entities/product/model/types";
import { Select, type SelectOption } from "@/shared/ui/Select";
import { productSortOptions } from "../model/sortOptions";
import styles from "./ProductSort.module.css";

type ProductSortProps = SortParams & {
  onSortChange: (sort: SortParams) => void;
};

export const ProductSort = ({ sortBy, order, onSortChange }: ProductSortProps) => {
  const value = sortBy && order ? `${sortBy}-${order}` : "default";

  const handleChange = (selectedValue: string) => {
    if (selectedValue === "default") {
      onSortChange({});
      return;
    }

    const selectedOption = productSortOptions.find((option) => option.value === selectedValue);
    if (!selectedOption) return;

    onSortChange({ sortBy: selectedOption.sortBy, order: selectedOption.order });
  };

  const options: SelectOption[] = [
    { value: "default", label: "По умолчанию" },
    ...productSortOptions.map(({ value, label }) => ({ value, label })),
  ];

  return (
    <div className={styles.sort}>
      <label className={styles.label} htmlFor='product-sort'>
        Сортировка
      </label>

      <Select id='product-sort' className={styles.select} value={value} options={options} onValueChange={handleChange} />
    </div>
  );
};
