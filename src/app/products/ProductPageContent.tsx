import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductSearch } from "@/features/product-search";
import { ProductCatalog } from "@/widgets/ProductCatalog";
import styles from "./page.module.css";
import { SortParams } from "@/entities/product/model/types";
import { ProductToolbar } from "@/widgets/ProductToolbar";

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q");
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [search, setSearch] = useState(query ?? "");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sort, setSort] = useState<SortParams>(() => ({
    sortBy: (searchParams.get("sortBy") as SortParams["sortBy"]) ?? undefined,
    order: (searchParams.get("order") as SortParams["order"]) ?? undefined,
  }));

  const debouncedSearch = useDebounce(search.trim(), 400);
  const activeSearch = search.trim() ? debouncedSearch : "";

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.trim()) {
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category) {
      setSearch("");
    }
  };

  const handleSortChange = (newSort: SortParams) => {
    setSort(newSort);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSort({});
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (sort.sortBy && sort.order) {
      params.set("sortBy", sort.sortBy);
      params.set("order", sort.order);
    } else {
      params.delete("sortBy");
      params.delete("order");
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `/products?${queryString}` : "/products";
    const currentUrl = `/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl);
    }
  }, [debouncedSearch, searchParams, selectedCategory, sort, router]);

  return (
    <main className={styles.page}>
      <ProductToolbar
        search={search}
        onSearchChange={handleSearchChange}
        sortBy={sort.sortBy}
        order={sort.order}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
      />
      <ProductCatalog
        search={activeSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sort.sortBy}
        order={sort.order}
      />
    </main>
  );
}
