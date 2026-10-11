import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductSearch } from "@/features/product-search";
import { ProductCatalog } from "@/widgets/ProductCatalog";
import styles from "./page.module.css";

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query ?? "");
  const [selectedCategory, setSelectedCategory] = useState("");

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
