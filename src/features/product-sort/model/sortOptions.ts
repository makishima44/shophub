import { SortParams } from "@/entities/product/model/types";

export const productSortOptions: {
  value: string;
  label: string;
  sortBy: NonNullable<SortParams["sortBy"]>;
  order: NonNullable<SortParams["order"]>;
}[] = [
  { value: "title-asc", label: "По названию: А–Я", sortBy: "title", order: "asc" },
  { value: "price-asc", label: "Сначала дешевле", sortBy: "price", order: "asc" },
  { value: "price-desc", label: "Сначала дороже", sortBy: "price", order: "desc" },
];
