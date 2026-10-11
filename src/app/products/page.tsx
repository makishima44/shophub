"use client";

import { ProductSearch } from "@/features/product-search";
import { Suspense, useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { ProductCatalog } from "@/widgets/ProductCatalog";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query ?? "");
  const [selectedCategory, setSelectedCategory] = useState("");

  const debouncedSearch = useDebounce(search.trim(), 400);
  const activeSearch = search.trim() ? debouncedSearch : "";

  const handleSearchChange = (value: string) => {
    setSearch(value);

    // DummyJSON cannot combine /products/search with a category filter.
    // A search therefore always means a global search, as on marketplaces.
    if (value.trim()) {
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Category navigation is a separate catalogue mode, not a hidden filter
    // over global search results.
    if (category) {
      setSearch("");
    }
  };

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";

    if (currentQuery === debouncedSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.replace(queryString ? `/products?${queryString}` : "/products");
  }, [debouncedSearch, searchParams, router]);

  return (
    <main className={styles.page}>
      <ProductSearch value={search} onChange={handleSearchChange} />
      <ProductCatalog search={activeSearch} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className={styles.page} />}>
      <ProductsPageContent />
    </Suspense>
  );
}
