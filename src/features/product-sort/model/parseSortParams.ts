import { SortParams } from "@/entities/product/model/types";
import { productSortOptions } from "./sortOptions";

export function parseSortParams(sortBy: string | null, order: string | null): SortParams {
  const matchingOption = productSortOptions.find((option) => option.sortBy === sortBy && option.order === order);

  return matchingOption ? { sortBy: matchingOption.sortBy, order: matchingOption.order } : {};
}
